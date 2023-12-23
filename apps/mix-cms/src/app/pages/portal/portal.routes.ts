import { Routes } from '@angular/router';
import { CMS_ROUTES, breadcrumbName } from '../../app.routes';
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
      import('@mixcore/module/database').then((m) => m.routes),
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
    path: CMS_ROUTES.portal.workspace.path,
    data: breadcrumbName('Workspace'),
    loadChildren: () =>
      import('@mixcore/module/task').then((m) => m.taskManagementRoutes),
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
    path: '',
    redirectTo: CMS_ROUTES.portal.dashboard.path,
    pathMatch: 'full',
  },
];
