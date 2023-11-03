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
    path: CMS_ROUTES.portal.task.path,
    data: breadcrumbName('Task Management'),
    loadComponent: () =>
      import('@mixcore/module/task').then((m) => m.TaskManageComponent),
  },
  {
    path: '',
    redirectTo: CMS_ROUTES.portal.dashboard.path,
    pathMatch: 'full',
  },
];
