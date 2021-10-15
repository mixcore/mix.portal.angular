import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { AccountInitFormComponent } from '../../components/account-init-form/account-init-form.component';

@Component({
  selector: 'account-init',
  templateUrl: './account-init.component.html',
  styleUrls: ['./account-init.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInitComponent {
  @ViewChild('accountForm', { static: false }) public accountForm?: AccountInitFormComponent;

  public submitAccount(): void {
    if (this.accountForm) {
      this.accountForm.submitForm();
    }
  }
}
