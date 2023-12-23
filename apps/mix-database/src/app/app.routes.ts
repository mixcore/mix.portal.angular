import { Route } from '@angular/router';
import { notLoginPageGuard } from '@mixcore/module/auth';
import { MixLayoutComponent } from '@mixcore/module/layout';

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
    news: {
      path: 'news',
      fullPath: 'app/news',
    },
    database: {
      path: 'db',
      fullPath: 'app/db',
    },
    databaseDoc: {
      path: 'open-api',
      fullPath: 'app/db/open-api',
    },
    databaseQuery: {
      path: 'query',
      fullPath: 'app/db/query',
    },
    databaseContext: {
      path: 'contexts',
      fullPath: 'app/db/contexts',
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
    component: MixLayoutComponent,
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
