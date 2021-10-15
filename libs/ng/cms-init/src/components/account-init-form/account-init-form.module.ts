import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountInitFormComponent } from './account-init-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedApiService } from '@mix-portal/ng/cms-api';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzInputModule, NzFormModule, NzSelectModule],
  declarations: [AccountInitFormComponent],
  exports: [AccountInitFormComponent],
  providers: [SharedApiService]
})
export class AccountInitFormModule {}
