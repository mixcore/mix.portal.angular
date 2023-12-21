import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalSettings, LoginModel } from '@mixcore/lib/auth';
import { AuthService, CryptoService } from '@mixcore/share/auth';
import { BaseComponent, DOMAIN_URL$, LoadingState } from '@mixcore/share/base';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixCheckboxComponent } from '@mixcore/ui/checkbox';
import { MixErrorAlertComponent } from '@mixcore/ui/error';
import { MixInputComponent } from '@mixcore/ui/input';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { filter, switchMap, take } from 'rxjs';
import { AUTH_ROUTE } from '../guard/token';

export interface LoginInfo {
  userName: string;
  password: string;
}

@Component({
  selector: 'mix-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixInputComponent,
    MixButtonComponent,
    MixFormErrorComponent,
    MixErrorAlertComponent,
    TuiRadioLabeledModule,
    TuiLinkModule,
    MixCheckboxComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BaseComponent {
  public formBuilder = inject(FormBuilder);
  public authService = inject(AuthService);
  public router = inject(Router);
  public domainUrls$ = inject(DOMAIN_URL$);
  public authConfig = inject(AUTH_ROUTE);
  public cryptoService = new CryptoService();
  public key = 'MixLoginInfo';

  public appUrls = ['prod', 'stage'];
  public modeForm = new FormGroup({
    url: new FormControl(''),
  });

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [true],
  });

  public submit(): void {
    if (FormHelper.validateForm(this.loginForm)) {
      this.clearError();
      this.authService.globalSetting$
        .pipe(
          filter(Boolean),
          take(1),
          switchMap((res: GlobalSettings) =>
            this.authService.login(
              this.loginForm.getRawValue() as unknown as LoginModel,
              res.apiEncryptKey
            )
          ),
          switchMap(() => this.authService.fetchUserData()),
          switchMap(() => this.authService.initRoles()),
          switchMap(() => this.authService.initCultures()),
          switchMap(() => this.authService.initPortalsMenu())
        )
        .pipe(this.observerLoadingState())
        .subscribe({
          next: () => this.handleLoginSuccess(),
          error: () => this.handleLoginError(),
        });
    }
  }

  public handleLoginSuccess(): void {
    localStorage.setItem(
      this.key,
      JSON.stringify({
        userName: this.loginForm.value.username,
      })
    );

    let redirectUrl = this.authService.redirectUrl;
    if (
      !redirectUrl ||
      redirectUrl === '/' ||
      redirectUrl === '/' + this.authConfig.notAuthRoute
    ) {
      redirectUrl = this.authConfig.authRoute;
    }

    this.router.navigate([redirectUrl]);
    this.authService.clearRedirectUrl();
  }

  public handleLoginError(): void {
    this.setState(LoadingState.Error);
    this.loginForm.enable();
    this.error = 'Invalid username or password';
  }
}
