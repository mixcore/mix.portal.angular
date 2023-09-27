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
import { AuthService } from '@mixcore/share/auth';
import { BaseComponent, DOMAIN_URL$, LoadingState } from '@mixcore/share/base';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixErrorAlertComponent } from '@mixcore/ui/error';
import { MixInputComponent } from '@mixcore/ui/input';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { filter, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CMS_ROUTES } from '../../../app.routes';

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
  public key = 'MixUserName';

  public appUrls = ['prod', 'stage'];
  public modeForm = new FormGroup({
    url: new FormControl(''),
  });

  public loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberPassword: [true],
  });

  constructor() {
    super();
    const current = this.domainUrls$.getValue();
    if (current === environment.domainUrl) {
      this.modeForm.controls.url.patchValue('prod');
    } else {
      this.modeForm.controls.url.patchValue('stage');
    }

    this.modeForm.controls.url.valueChanges.subscribe((v) => {
      if (v === 'stage') {
        this.domainUrls$.next(environment.stageDomainUrl);
      } else {
        this.domainUrls$.next(environment.domainUrl);
      }

      localStorage.setItem('domainUrl', this.domainUrls$.getValue());
    });

    const userName = localStorage.getItem(this.key) ?? '';
    this.loginForm.controls.userName.patchValue(userName);
  }

  public submit(): void {
    if (FormHelper.validateForm(this.loginForm)) {
      this.clearError();
      this.loginForm.disable();
      this.authService.globalSetting$

        .pipe(
          filter(Boolean),
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
    let redirectUrl = this.authService.redirectUrl;
    localStorage.setItem(this.key, this.loginForm.value.userName || '');

    if (
      !redirectUrl ||
      redirectUrl === '/' ||
      redirectUrl === '/' + CMS_ROUTES.auth.login.fullPath
    ) {
      redirectUrl = CMS_ROUTES.portal.dashboard.fullPath;
    }

    this.router.navigateByUrl(redirectUrl);
    this.authService.clearRedirectUrl();
  }

  public handleLoginError(): void {
    this.setState(LoadingState.Error);
    this.loginForm.enable();
    this.error = 'Invalid username or password';
  }
}
