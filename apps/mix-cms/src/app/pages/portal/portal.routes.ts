import {
  WebComponentWrapperOptions,
  startsWith,
} from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';
import { CMS_ROUTES, breadcrumbName } from '../../app.routes';
import { WebComponentStandaloneWrapperComponent } from '../../components/web-component-standalone-wrapper/web-component-standalone-wrapper.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { ConfigFormComponent } from './app-settings/config-form/config-form.component';

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
    path: CMS_ROUTES.portal.inbox.path,
    loadComponent: () =>
      import('./inbox/inbox.component').then((m) => m.InboxComponent),
    data: breadcrumbName('Inbox'),
  },
  {
    path: CMS_ROUTES.portal.post.path,
    data: breadcrumbName('Posts'),
    loadChildren: () => import('./post/post.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal.database.path,
    data: breadcrumbName('Databases'),
    loadChildren: () =>
      import('./database/database.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal.page.path,
    data: breadcrumbName('Pages'),
    loadChildren: () => import('./page/page.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal.module.path,
    data: breadcrumbName('Modules'),
    loadChildren: () => import('./module/module.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal['database-data'].path,
    data: breadcrumbName('Database'),
    loadChildren: () =>
      import('./database-data/database-data.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal.user.path,
    data: breadcrumbName('Users'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./user/user.component').then((m) => m.UserComponent),
      },
    ],
  },
  {
    path: CMS_ROUTES.portal.permission.path,
    data: breadcrumbName('Permissions'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./permissions/permissions.component').then(
            (m) => m.PermissionsComponent
          ),
      },
    ],
  },
  {
    path: CMS_ROUTES.portal.roles.path,
    data: breadcrumbName('Roles'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./roles/roles.component').then((m) => m.RolesComponent),
      },
    ],
  },
  {
    path: CMS_ROUTES.portal.order.path,
    data: breadcrumbName('Orders'),
    loadChildren: () => import('./order/order.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal.promotion.path,
    data: breadcrumbName('Promotions'),
    loadChildren: () =>
      import('./promotion/promotion.routes').then((m) => m.routes),
  },
  {
    path: CMS_ROUTES.portal.discount.path,
    data: breadcrumbName('Discount'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./discount/discount.component').then(
            (m) => m.PostDiscountComponent
          ),
      },
    ],
  },
  {
    path: CMS_ROUTES.portal.task.path,
    data: breadcrumbName('Task Management'),
    loadComponent: () =>
      import('./task-manage/task-manage.component').then(
        (m) => m.TaskManageComponent
      ),
  },
  {
    path: CMS_ROUTES.portal.settings.path,
    data: breadcrumbName('App Settings'),
    children: [
      {
        path: '',
        component: AppSettingsComponent,
      },
      {
        path: ':id',
        component: ConfigFormComponent,
        data: breadcrumbName('Update'),
      },
      {
        path: 'create',
        component: ConfigFormComponent,
        data: breadcrumbName('Create Setting'),
      },
    ],
  },
  {
    matcher: startsWith('kanban'),
    component: WebComponentStandaloneWrapperComponent,
    data: {
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.mjs',
      exposedModule: './web-components',
      elementName: 'mix-kanban',
    } as WebComponentWrapperOptions,
  },
  {
    path: '',
    redirectTo: CMS_ROUTES.portal.dashboard.path,
    pathMatch: 'full',
  },
];
