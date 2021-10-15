import { BaseComponent, ComponentType } from '@coreng/angular-core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils, confirmValidator } from '@mix-portal/ng/shared';
import { IInitAccountRequest, InitApiService } from '@mix-portal/ng/cms-api';

import { Router } from '@angular/router';

@Component({
  selector: 'account-init-form',
  templateUrl: './account-init-form.component.html',
  styleUrls: ['./account-init-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInitFormComponent extends BaseComponent<ComponentType.Smart> {
  public initAccountForm!: FormGroup;

  constructor(private fb: FormBuilder, private initApi: InitApiService, private router: Router) {
    super();
  }

  public onInit(): void {
    this.initAccountForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required, confirmValidator(() => this.initAccountForm?.controls?.password.value)]]
    });
  }

  public updateConfirmValidator(): void {
    Promise.resolve().then(() => this.initAccountForm.controls.confirmPassword.updateValueAndValidity());
  }

  public submitForm(): void {
    const isValid: boolean = FormUtils.validateForm(this.initAccountForm);
    if (!isValid) {
      return;
    }

    const request: IInitAccountRequest = this.initAccountForm.value;
    this.initApi.initAccount(request, { shouldShowSpinner: true }).subscribe(res => {
      this.router.navigateByUrl('');
    });
  }
}
