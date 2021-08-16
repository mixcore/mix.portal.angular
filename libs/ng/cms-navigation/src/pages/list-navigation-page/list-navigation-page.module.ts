import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ListNavigationPageComponent } from './list-navigation-page.component';
import { NgModule } from '@angular/core';

const ROUTE: Route[] = [
  {
    path: '',
    component: ListNavigationPageComponent
  }
];

@NgModule({
  declarations: [ListNavigationPageComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTE)],
  exports: [ListNavigationPageComponent]
})
export class ListNavigationPageModule {}
