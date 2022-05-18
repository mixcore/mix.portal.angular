import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalSettings } from '@mix-spa/mix.lib';
import { AuthApiService, FormUtils, ShareApiService } from '@mix-spa/mix.share';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { switchMap } from 'rxjs';

@Component({
  selector: 'mix-spa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private shareSetting: ShareApiService,
    private authSrv: AuthApiService,
    private route: Router,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  public signinForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberPassword: [true]
  });

  public submitForm(): void {
    if (FormUtils.validateForm(this.signinForm)) {
      this.loading = true;
      this.shareSetting
        .getGlobalSetting()
        .pipe(switchMap((res: GlobalSettings) => this.authSrv.login(this.signinForm.value, res.apiEncryptKey)))
        .subscribe({
          next: () => this.handleLoginSuccess(),
          error: () => this.handleLoginError()
        });
    }
  }

  public handleLoginSuccess(): void {
    this.loading = false;
    this.alertService.open('Successfully login!', { status: TuiNotification.Success }).subscribe();
    this.route.navigateByUrl('/portal');
  }

  public handleLoginError(): void {
    this.loading = false;
    this.alertService.open('Error when login, please try again!', { status: TuiNotification.Error }).subscribe();
  }
}
