import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostRepository } from '@mix-lib';

@NgModule({
  providers: [PostRepository],
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
