import { Route } from '@angular/router';
import { MixPortalLayoutComponent } from './pages/portal/portal.layout';
import { portalPageGuard } from './shares/guards/auth-login.guard';

export const breadcrumbName = (name: string) => ({ title: name });

export const processRoutes = (option: {
  path: string;
  name: string;
  listComponent: any;
  detailComponent: any;
}) => ({
  path: option.path,
  data: breadcrumbName(option.name),
  children: [
    {
      path: '',
      component: option.listComponent,
    },
    {
      path: ':id',
      component: option.detailComponent,
      data: breadcrumbName('Detail'),
    },
    {
      path: 'create',
      component: option.detailComponent,
      data: breadcrumbName('Create'),
    },
  ],
});

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
    task: {
      path: 'tasks',
      fullPath: 'app/tasks',
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
      import('./pages/auth/auth.routes').then((m) => m.AuthRoutes),
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
    canActivate: [portalPageGuard],
    loadChildren: () =>
      import('./pages/portal/portal.routes').then((m) => m.PortalRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CMS_ROUTES.auth.path,
  },
];
