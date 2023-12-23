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
    inbox: {
      path: 'inbox',
      fullPath: 'app/inbox',
    },
    logs: {
      path: 'logs',
      fullPath: 'app/logs',
    },
    post: {
      path: 'post',
      fullPath: 'app/post',
    },
    page: {
      path: 'page',
      fullPath: 'app/page',
    },
    module: {
      path: 'module',
      fullPath: 'app/module',
    },
    database: {
      path: 'database',
      fullPath: 'app/database',
    },
    databaseQuery: {
      path: 'database/query',
      fullPath: 'app/database/query',
    },
    databaseContext: {
      path: 'database/contexts',
      fullPath: 'app/database/contexts',
    },
    'database-doc': {
      path: 'open-api',
      fullPath: 'app/database/open-api',
    },
    'database-data': {
      path: 'db-data',
      fullPath: 'app/db-data',
    },
    settings: {
      path: 'app-settings',
      fullPath: 'app/app-settings',
    },
    user: {
      path: 'user',
      fullPath: 'app/user',
    },
    permission: {
      path: 'permission',
      fullPath: 'app/permission',
    },
    roles: {
      path: 'roles',
      fullPath: 'app/roles',
    },
    order: {
      path: 'order',
      fullPath: 'app/order',
    },
    discount: {
      path: 'discount',
      fullPath: 'app/discount',
    },
    promotion: {
      path: 'promotion',
      fullPath: 'app/promotion',
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
