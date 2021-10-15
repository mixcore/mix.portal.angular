import { Route, RouterModule } from '@angular/router';

import { AccountInitComponent } from './account-init.component';
import { AccountInitFormModule } from '../../components/account-init-form/account-init-form.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

const ROUTES: Route[] = [
  {
    path: '',
    component: AccountInitComponent
  }
];

@NgModule({
  declarations: [AccountInitComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), NzButtonModule, AccountInitFormModule],
  exports: [AccountInitComponent]
})
export class AccountInitModule {}
