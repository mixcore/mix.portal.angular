import { Route } from '@angular/router';
import { notLoginPageGuard } from '@mixcore/module/auth';
import { MixPortalLayoutComponent } from './pages/portal/portal.layout';

export const breadcrumbName = (name: string) => ({ title: name });

export const CMS_ROUTES = {
  auth: {
    path: 'auth',
    login: {
      path: 'login',
      fullPath: 'auth/login',
    },
  },
  error: {
    path: 'error',
  },
  portal: {
    path: 'app',
    dashboard: {
      path: 'dashboard',
      fullPath: 'app/dashboard',
    },
    workspace: {
      path: 'workspace',
      fullPath: 'app/workspace',
    },
    board: {
      path: 'board',
      fullPath: 'app/workspace/board',
    },
    project: {
      path: 'project',
      fullPath: 'app/workspace/project',
    },
    timeline: {
      path: 'timeline',
      fullPath: 'app/workspace/timeline',
    },
  },
};

export const ROUTES: Route[] = [
  {
    path: CMS_ROUTES.auth.path,
    loadChildren: () =>
      import('@mixcore/module/auth').then((m) => m.AuthRoutes),
  },
  {
    path: CMS_ROUTES.error.path,
    loadComponent: () =>
      import('./pages/error/unknown-error/unknown-error.component').then(
        (m) => m.UnknownErrorComponent
      ),
  },
  {
    path: CMS_ROUTES.portal.path,
    component: MixPortalLayoutComponent,
    data: breadcrumbName('Home'),
    canActivate: [notLoginPageGuard],
    loadChildren: () =>
      import('./pages/portal/portal.routes').then((m) => m.PortalRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CMS_ROUTES.auth.path,
  },
];
