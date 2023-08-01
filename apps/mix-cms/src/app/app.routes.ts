import { Route } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { UnknownErrorComponent } from './pages/error/unknown-error/unknown-error.component';
import { AppSettingsComponent } from './pages/portal/app-settings/app-settings.component';
import { ConfigFormComponent } from './pages/portal/app-settings/config-form/config-form.component';
import { DashboardComponent } from './pages/portal/dashboard/dashboard.component';
import { DatabaseDataFormComponent } from './pages/portal/database-data/database-data-form/database-data-form.component';
import { DatabaseDataComponent } from './pages/portal/database-data/database-data.component';
import { DatabaseDetailComponent } from './pages/portal/database/database-detail/database-detail.component';
import { DatabaseComponent } from './pages/portal/database/database.component';
import { PostDiscountComponent } from './pages/portal/discount/discount.component';
import { InboxComponent } from './pages/portal/inbox/inbox.component';
import { ModuleDataDetailComponent } from './pages/portal/module/module-data-detail/module-data-detail.component';
import { ModuleDataComponent } from './pages/portal/module/module-data/module-data.component';
import { ModuleDetailComponent } from './pages/portal/module/module-detail/module-detail.component';
import { ModulesComponent } from './pages/portal/module/module.component';
import { OrderDetailComponent } from './pages/portal/order/order-detail/order-detail.component';
import { OrderComponent } from './pages/portal/order/order.component';
import { PageDetailComponent } from './pages/portal/page/page-detail/page-detail.component';
import { PagePageComponent } from './pages/portal/page/page.component';
import { PermissionsComponent } from './pages/portal/permissions/permissions.component';
import { MixPortalLayoutComponent } from './pages/portal/portal.layout';
import { PostDetailComponent } from './pages/portal/post/post-detail/post-detail.component';
import { PostPageComponent } from './pages/portal/post/post.component';
import { PromotionDetailComponent } from './pages/portal/promotion/promotion-detail/promotion-detail.component';
import { PromotionComponent } from './pages/portal/promotion/promotion.component';
import { RolesComponent } from './pages/portal/roles/roles.component';
import { TaskManageComponent } from './pages/portal/task-manage/task-manage.component';
import { UserComponent } from './pages/portal/user/user.component';
import {
  loginPageGuard,
  portalPageGuard,
} from './shares/guards/auth-login.guard';

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
    children: [
      {
        path: CMS_ROUTES.auth.login.path,
        component: LoginComponent,
        canActivate: [loginPageGuard],
      },
      {
        path: '',
        redirectTo: CMS_ROUTES.auth.login.path,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: CMS_ROUTES.error.path,
    component: UnknownErrorComponent,
  },
  {
    path: CMS_ROUTES.portal.path,
    component: MixPortalLayoutComponent,
    data: breadcrumbName('Home'),
    canActivate: [portalPageGuard],
    children: [
      {
        path: CMS_ROUTES.portal.dashboard.path,
        component: DashboardComponent,
        data: breadcrumbName('Dashboard'),
      },
      {
        path: CMS_ROUTES.portal.inbox.path,
        component: InboxComponent,
        data: breadcrumbName('Inbox'),
      },
      processRoutes({
        path: CMS_ROUTES.portal.post.path,
        name: 'Posts',
        listComponent: PostPageComponent,
        detailComponent: PostDetailComponent,
      }),
      processRoutes({
        path: CMS_ROUTES.portal.database.path,
        name: 'Databases',
        listComponent: DatabaseComponent,
        detailComponent: DatabaseDetailComponent,
      }),
      processRoutes({
        path: CMS_ROUTES.portal.page.path,
        name: 'Pages',
        listComponent: PagePageComponent,
        detailComponent: PageDetailComponent,
      }),
      {
        path: CMS_ROUTES.portal.module.path,
        children: [
          {
            path: '',
            component: ModulesComponent,
            data: breadcrumbName('List'),
          },
          {
            path: ':id',
            data: breadcrumbName('Module Data'),
            children: [
              {
                path: '',
                component: ModuleDetailComponent,
                data: breadcrumbName('Detail'),
              },
              {
                path: 'data',
                component: ModuleDataComponent,
                data: breadcrumbName('Data'),
              },
              {
                path: 'data/:dataId',
                component: ModuleDataDetailComponent,
                data: breadcrumbName('Edit'),
              },
              {
                path: 'data/create',
                component: ModuleDataDetailComponent,
              },
            ],
          },
          {
            path: 'create',
            component: ModuleDetailComponent,
            data: breadcrumbName('Create'),
          },
        ],
      },
      {
        path: CMS_ROUTES.portal['database-data'].path,
        data: breadcrumbName('Database'),
        children: [
          {
            path: ':databaseSysName',
            component: DatabaseDataComponent,
            data: breadcrumbName('Instance'),
          },
          {
            path: ':databaseSysName/:id',
            component: DatabaseDataFormComponent,
            data: breadcrumbName('Update'),
          },
          {
            path: ':databaseSysName/create',
            component: DatabaseDataFormComponent,
            data: breadcrumbName('Create'),
          },
          {
            path: '',
            redirectTo: '/' + CMS_ROUTES.portal.database.fullPath,
            pathMatch: 'full',
          },
        ],
      },
      {
        path: CMS_ROUTES.portal.user.path,
        data: breadcrumbName('Users'),
        children: [
          {
            path: '',
            component: UserComponent,
            data: breadcrumbName('Available'),
          },
        ],
      },
      {
        path: CMS_ROUTES.portal.permission.path,
        data: breadcrumbName('Permissions'),
        children: [
          {
            path: '',
            component: PermissionsComponent,
            data: breadcrumbName('Available'),
          },
        ],
      },
      {
        path: CMS_ROUTES.portal.roles.path,
        data: breadcrumbName('Roles'),
        children: [
          {
            path: '',
            component: RolesComponent,
            data: breadcrumbName('Available Roles'),
          },
        ],
      },
      {
        path: CMS_ROUTES.portal.order.path,
        data: breadcrumbName('Orders'),
        children: [
          {
            path: '',
            component: OrderComponent,
            data: breadcrumbName('All Orders'),
          },
          {
            path: ':id',
            component: OrderDetailComponent,
            data: breadcrumbName('Order Info'),
          },
        ],
      },
      {
        path: CMS_ROUTES.portal.promotion.path,
        data: breadcrumbName('Promotions'),
        children: [
          {
            path: '',
            component: PromotionComponent,
            data: breadcrumbName('All Promotion'),
          },
          {
            path: ':id',
            component: PromotionDetailComponent,
            data: breadcrumbName('Edit Promotion'),
          },
        ],
      },
      {
        path: CMS_ROUTES.portal.discount.path,
        data: breadcrumbName('Discount'),
        children: [
          {
            path: '',
            component: PostDiscountComponent,
            data: breadcrumbName('Rules'),
          },
        ],
      },
      {
        path: CMS_ROUTES.portal.task.path,
        data: breadcrumbName('Task Management'),
        component: TaskManageComponent,
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
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: CMS_ROUTES.auth.path,
  },
];
