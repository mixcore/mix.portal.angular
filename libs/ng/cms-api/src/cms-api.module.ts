import { AppSettingApiService } from './services';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  providers: [AppSettingApiService]
})
export class CmsApiModule {}
