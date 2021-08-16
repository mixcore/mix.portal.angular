import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./pages/list-post/list-post.module').then(m => m.ListPostModule)
      }
    ])
  ]
})
export class CmsPostModule {}
