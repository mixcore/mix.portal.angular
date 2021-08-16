import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./pages/page-list/page-list.module').then(m => m.PageListPageModule)
      }
    ])
  ]
})
export class CmsPageModule {}
