import { Routes } from '@angular/router';
import { CMS_ROUTES } from '../../app.routes';

export const PortalRoutes: Routes = [
  {
    path: CMS_ROUTES.portal.dashboard.path,
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: CMS_ROUTES.portal.database.path,
    loadChildren: () =>
      import('@mixcore/module/database').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal.cam.path,
    loadChildren: () => import('@mixcore/module/account').then((m) => m.ROUTES),
  },
  {
    path: CMS_ROUTES.portal.events.path,
    loadChildren: () =>
      import('@mixcore/module/scheduler').then((m) => m.SchedulerRoute),
  },
  {
    path: '',
    redirectTo: CMS_ROUTES.portal.dashboard.path,
    pathMatch: 'full',
  },
];
