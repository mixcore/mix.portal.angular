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
    path: CMS_ROUTES.portal.workspace.path,
    data: breadcrumbName('Workspace'),
    loadChildren: () =>
      import('@mixcore/module/task').then((m) => m.taskManagementRoutes),
  },
  {
    path: '',
    redirectTo: CMS_ROUTES.portal.dashboard.path,
    pathMatch: 'full',
  },
];
