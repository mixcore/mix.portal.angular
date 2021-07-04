import { AppSettingComponent } from './app-setting.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [AppSettingComponent],
  imports: [CommonModule, FormsModule, NzTabsModule, NzSelectModule, TranslocoModule],
  exports: [AppSettingComponent]
})
export class AppSettingModule {}
