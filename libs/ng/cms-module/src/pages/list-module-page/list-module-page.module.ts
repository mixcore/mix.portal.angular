import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ListModulePageComponent } from './list-module-page.component';
import { ModuleListFilterModule } from '../../components/module-list-filter/module-list-filter.module';
import { ModuleListModule } from '../../components/module-list/module-list.module';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslocoModule } from '@ngneat/transloco';

const LIST_POST_PAGE_ROUTE: Route[] = [
  {
    path: '',
    component: ListModulePageComponent
  }
];

@NgModule({
  declarations: [ListModulePageComponent],
  imports: [
    RouterModule.forChild(LIST_POST_PAGE_ROUTE),
    CommonModule,
    TranslocoModule,
    NzGridModule,
    NzButtonModule,
    ModuleListFilterModule,
    ModuleListModule
  ],
  exports: [ListModulePageComponent]
})
export class ListModulePageModule {}
