import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./pages/list-module-page/list-module-page.module').then(m => m.ListModulePageModule)
      }
    ])
  ]
})
export class CmsModuleModule {}
