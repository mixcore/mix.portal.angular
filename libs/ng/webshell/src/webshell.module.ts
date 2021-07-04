import { Route, RouterModule } from '@angular/router';
import { authTokenProvider, baseHrefProvider, errorHandlingProvider, nzDefaultLangProvider, spinnerProvider } from './webshell.provider';

import { AppHeaderComponent } from './ui/header/app-header.component';
import { AppSettingModule } from './ui/app-setting/app-setting.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HulkSidebarComponent } from './ui/sidebar/sidebar.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslocoRootModule } from './translation-root.module';

const ROUTE: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: async () => (await import('@mix-portal/ng/cms-dashboard')).CmsDashboardModule,
        data: {
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'portal',
        loadChildren: async () => (await import('@mix-portal/ng/cms-portal')).NgCmsPortalModule,
        data: {
          breadcrumb: 'Portal'
        }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
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
    AppSettingModule
  ],
  declarations: [LayoutComponent, HulkSidebarComponent, AppHeaderComponent],
  providers: [baseHrefProvider, authTokenProvider, errorHandlingProvider, spinnerProvider, nzDefaultLangProvider],
  exports: [RouterModule]
})
export class PortalWebShellModule {}
