import { Routes } from '@angular/router';
import { breadcrumbName } from '../../../app.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./module.component').then((m) => m.ModulesComponent),
  },
  {
    path: ':id',
    data: breadcrumbName('Module Data'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./module-detail/module-detail.component').then(
            (m) => m.ModuleDetailComponent
          ),
      },
      {
        path: 'data',
        loadComponent: () =>
          import('./module-data/module-data.component').then(
            (m) => m.ModuleDataComponent
          ),
      },
      {
        path: 'data/:dataId',
        loadComponent: () =>
          import('./module-data-detail/module-data-detail.component').then(
            (m) => m.ModuleDataDetailComponent
          ),
      },
      {
        path: 'data/create',
        loadComponent: () =>
          import('./module-data-detail/module-data-detail.component').then(
            (m) => m.ModuleDataDetailComponent
          ),
      },
    ],
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./module-detail/module-detail.component').then(
        (m) => m.ModuleDetailComponent
      ),
  },
];
