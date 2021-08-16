import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PageListComponent } from './page-list.component';
import { PageListFilterModule } from '../../components/page-list-filter/page-list-filter.module';
import { PageListModule } from '../../components/page-list/page-list.module';
import { TranslocoModule } from '@ngneat/transloco';

const ROUTE: Route[] = [
  {
    path: '',
    component: PageListComponent
  }
];

@NgModule({
  declarations: [PageListComponent],
  imports: [
    RouterModule.forChild(ROUTE),
    CommonModule,
    TranslocoModule,
    NzGridModule,
    NzButtonModule,
    PageListFilterModule,
    PageListModule
  ],
  exports: [PageListComponent]
})
export class PageListPageModule {}
