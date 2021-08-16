import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ListPostComponent } from './list-post.component';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PostListFilterModule } from '../../component/post-list-filter/post-list-filter.module';
import { PostListModule } from '../../component/post-list/post-list.module';
import { TranslocoModule } from '@ngneat/transloco';

const LIST_POST_PAGE_ROUTE: Route[] = [
  {
    path: '',
    component: ListPostComponent
  }
];

@NgModule({
  declarations: [ListPostComponent],
  imports: [
    RouterModule.forChild(LIST_POST_PAGE_ROUTE),
    CommonModule,
    TranslocoModule,
    NzGridModule,
    NzButtonModule,
    PostListFilterModule,
    PostListModule
  ],
  exports: [ListPostComponent]
})
export class ListPostModule {}
