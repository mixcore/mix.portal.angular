import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('./pages/site-init/site-init.module').then(m => m.SiteInitModule)
  },
  {
    path: 'step2',
    loadChildren: () => import('./pages/account-init/account-init.module').then(m => m.AccountInitModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)]
})
export class CmsInitModule {}
