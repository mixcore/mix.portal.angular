import { Routes } from '@angular/router';
import { breadcrumbName } from '../../../app.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./database.component').then((m) => m.DatabaseComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./database-detail/database-detail.component').then(
        (m) => m.DatabaseDetailComponent
      ),
    data: breadcrumbName('Detail'),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./database-detail/database-detail.component').then(
        (m) => m.DatabaseDetailComponent
      ),
    data: breadcrumbName('Create'),
  },
];
