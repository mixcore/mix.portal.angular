import { Routes } from '@angular/router';
import { CMS_ROUTES } from '../../../app.routes';

export const routes: Routes = [
  {
    path: ':databaseSysName',
    loadComponent: () =>
      import('./database-data.component').then((m) => m.DatabaseDataComponent),
  },
  {
    path: ':databaseSysName/:id',
    loadComponent: () =>
      import('./database-data-form/database-data-form.component').then(
        (m) => m.DatabaseDataFormComponent
      ),
  },
  {
    path: ':databaseSysName/create',
    loadComponent: () =>
      import('./database-data-form/database-data-form.component').then(
        (m) => m.DatabaseDataFormComponent
      ),
  },
  {
    path: '',
    redirectTo: '/' + CMS_ROUTES.portal.database.fullPath,
    pathMatch: 'full',
  },
];
