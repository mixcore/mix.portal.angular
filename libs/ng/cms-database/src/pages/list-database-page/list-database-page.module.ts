import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ListDatabasePageComponent } from './list-database-page.component';
import { NgModule } from '@angular/core';

const ROUTE: Route[] = [
  {
    path: '',
    component: ListDatabasePageComponent
  }
];

@NgModule({
  declarations: [ListDatabasePageComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTE)],
  exports: [ListDatabasePageComponent]
})
export class ListDatabasePageModule {}
