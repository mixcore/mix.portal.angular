import { Routes } from '@angular/router';
import { breadcrumbName } from '../../../app.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./database.component').then((m) => m.DatabaseComponent),
  },
  {
    path: 'query/:databaseSysName',
    loadComponent: () =>
      import('./database-data/database-data.component').then(
        (m) => m.DatabaseDataComponent
      ),
  },
  {
    path: 'query',
    loadComponent: () =>
      import('./database-data/database-data.component').then(
        (m) => m.DatabaseDataComponent
      ),
  },
  {
    path: 'contexts',
    loadComponent: () =>
      import('./database-context/database-context.component').then(
        (m) => m.DatabaseContextComponent
      ),
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
  {
    path: 'open-api/:id',
    loadComponent: () =>
      import('./database-document/database-document.component').then(
        (m) => m.DatabaseDocumentComponent
      ),
  },
];
