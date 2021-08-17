import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const ROUTE: Route[] = [
  {
    path: '',
    loadChildren: () => import('./pages/list-database-page/list-database-page.module').then(m => m.ListDatabasePageModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTE)]
})
export class CmsDatabaseModule {}
