import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SiteInitComponent } from './site-init.component';
import { SiteInitFormModule } from '../../components/site-init-form/site-init-form.module';

const ROUTES: Route[] = [
  {
    path: '',
    component: SiteInitComponent
  }
];

@NgModule({
  declarations: [SiteInitComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES), SiteInitFormModule, NzButtonModule],
  exports: [SiteInitComponent]
})
export class SiteInitModule {}
