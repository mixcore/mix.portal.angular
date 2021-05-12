import {
  CheckboxModule,
  DialogModule,
  PlaceholderModule,
} from 'carbon-components-angular';

import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { CollapseButtonComponent } from './components/collapse-button/collapse-button.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppSidebarComponent, CollapseButtonComponent],
  exports: [AppSidebarComponent, CollapseButtonComponent],
  imports: [CommonModule, DialogModule, PlaceholderModule, CheckboxModule],
})
export class SharedModule {}
