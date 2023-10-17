import { Routes } from '@angular/router';
import { CMS_ROUTES, breadcrumbName } from '../../app.routes';

export const PortalRoutes: Routes = [
  {
    path: CMS_ROUTES.portal.dashboard.path,
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    data: breadcrumbName('Dashboard'),
  },
  {
    path: CMS_ROUTES.portal.database.path,
    data: breadcrumbName('Databases'),
    loadChildren: () =>
      import('./database/database.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal['database-data'].path,
    data: breadcrumbName('Database'),
    loadChildren: () =>
      import('./database-data/database-data.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: CMS_ROUTES.portal.dashboard.path,
    pathMatch: 'full',
  },
];
