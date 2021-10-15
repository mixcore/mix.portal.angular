import { Route, RouterModule } from '@angular/router';
import { authTokenProvider, baseHrefProvider, errorHandlingProvider, nzDefaultLangProvider, spinnerProvider } from './webshell.provider';

import { AppHeaderComponent } from './ui/header/app-header.component';
import { AppSettingModule } from './ui/app-setting/app-setting.module';
import { CmsApiModule } from '@mix-portal/ng/cms-api';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HulkSidebarComponent } from './ui/sidebar/sidebar.component';
import { InitGuard } from './guards/init-guards';
import { LayoutBlankComponent } from './ui/layout-blank/layout-blank.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PortalGuard } from './guards/app-guards';
import { TranslocoRootModule } from './translation-root.module';

const ROUTE: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [PortalGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: async () => (await import('@mix-portal/ng/cms-dashboard')).CmsDashboardModule,
        data: {
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'navigation',
        loadChildren: async () => (await import('@mix-portal/ng/cms-navigation')).CmsNavigationModule,
        data: {
          breadcrumb: 'Navigation'
        }
      },
      {
        path: 'page',
        loadChildren: async () => (await import('@mix-portal/ng/cms-page')).CmsPageModule,
        data: {
          breadcrumb: 'Pages'
        }
      },
      {
        path: 'post',
        loadChildren: async () => (await import('@mix-portal/ng/cms-post')).CmsPostModule,
        data: {
          breadcrumb: 'Posts'
        }
      },
      {
        path: 'module',
        loadChildren: async () => (await import('@mix-portal/ng/cms-module')).CmsModuleModule,
        data: {
          breadcrumb: 'Modules'
        }
      },
      {
        path: 'database',
        loadChildren: async () => (await import('@mix-portal/ng/cms-database')).CmsDatabaseModule,
        data: {
          breadcrumb: 'Databases'
        }
      }
    ]
  },
  {
    path: 'init',
    component: LayoutBlankComponent,
    canActivate: [InitGuard],
    children: [
      {
        path: '',
        loadChildren: async () => (await import('@mix-portal/ng/cms-init')).CmsInitModule
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTE, {
      scrollPositionRestoration: 'top'
    }),
    HttpClientModule,
    NzIconModule,
    NzMenuModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    TranslocoRootModule,
    NzTabsModule,
    NzModalModule,
    AppSettingModule,
    CmsApiModule
  ],
  declarations: [LayoutComponent, LayoutBlankComponent, HulkSidebarComponent, AppHeaderComponent],
  providers: [baseHrefProvider, authTokenProvider, errorHandlingProvider, spinnerProvider, nzDefaultLangProvider, PortalGuard, InitGuard],
  exports: [RouterModule]
})
export class PortalWebShellModule {}
