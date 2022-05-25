/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from '@mix-spa/mix.lib';
import { FormUtils, ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'init-account-information',
  templateUrl: './init-account-information.component.html',
  styleUrls: ['./init-account-information.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class InitAccountInformationComponent {
  @Output() public accountSubmit: EventEmitter<AccountModel> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  public confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.accountForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  public accountForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required, this.confirmationValidator]]
  });

  public submitForm(): void {
    if (FormUtils.validateForm(this.accountForm)) {
      this.accountSubmit.emit(this.accountForm.value);
    }
  }
}
