import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const ROUTE: Route[] = [
  {
    path: '',
    loadChildren: () => import('./pages/list-navigation-page/list-navigation-page.module').then(m => m.ListNavigationPageModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTE)]
})
export class CmsNavigationModule {}
