import { Routes } from '@angular/router';
import { breadcrumbName } from '../../../app.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page.component').then((m) => m.PagePageComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./page-detail/page-detail.component').then(
        (m) => m.PageDetailComponent
      ),
    data: breadcrumbName('Detail'),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./page-detail/page-detail.component').then(
        (m) => m.PageDetailComponent
      ),
    data: breadcrumbName('Create'),
  },
];
