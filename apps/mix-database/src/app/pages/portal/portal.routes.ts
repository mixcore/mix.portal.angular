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
    data: breadcrumbName('Workspace'),
    loadChildren: () =>
      import('@mixcore/module/database').then((m) => m.routes),
  },

  {
    path: CMS_ROUTES.portal.cam.path,
    data: breadcrumbName('CAM'),
    loadChildren: () => import('@mixcore/module/account').then((m) => m.ROUTES),
  },
  {
    path: '',
    redirectTo: CMS_ROUTES.portal.dashboard.path,
    pathMatch: 'full',
  },
];
