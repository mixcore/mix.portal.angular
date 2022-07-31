import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalSettings } from '@mix-spa/mix.lib';
import {
  AuthApiService,
  FormUtils,
  ShareApiService,
  ShareModule
} from '@mix-spa/mix.share';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'mix-spa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class LoginComponent {
  public loading = false;
  public loginError = new TuiValidationError(
    'Failed to login, please re-check your Username or Password'
  );
  public showError = false;

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    private route: Router,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  public signInForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberPassword: [true]
  });

  public submitForm(): void {
    this.showError = false;
    if (FormUtils.validateForm(this.signInForm)) {
      this.loading = true;
      this.shareSetting
        .getGlobalSetting()
        .pipe(
          switchMap((res: GlobalSettings) =>
            this.authSrv.login(this.signInForm.value, res.apiEncryptKey)
          )
        )
        .subscribe({
          next: () => this.handleLoginSuccess(),
          error: () => this.handleLoginError()
        });
    }
  }

  public handleLoginSuccess(): void {
    this.loading = false;
    this.alertService
      .open('Successfully login!', { status: TuiNotification.Success })
      .subscribe();

    const redirectUrl: string | null = localStorage.getItem('redirectUrl');
    this.route
      .navigateByUrl(redirectUrl ?? '/portal')
      .then(() => localStorage.removeItem('redirectUrl'));
  }

  public handleLoginError(): void {
    this.loading = false;
    this.showError = true;
    this.alertService
      .open('Error when login, please try again!', {
        status: TuiNotification.Error
      })
      .subscribe();
  }
}
