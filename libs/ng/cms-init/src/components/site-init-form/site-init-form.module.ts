import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CultureStore } from './culture.store';
import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedApiService } from '@mix-portal/ng/cms-api';
import { SiteInitFormComponent } from './site-init-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzInputModule, NzFormModule, NzSelectModule],
  declarations: [SiteInitFormComponent],
  exports: [SiteInitFormComponent],
  providers: [SharedApiService, CultureStore]
})
export class SiteInitFormModule {}
