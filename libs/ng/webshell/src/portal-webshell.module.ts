import { Route, RouterModule } from '@angular/router';

import { AppHeaderComponent } from './ui/header/app-header.component';
import { CommonModule } from '@angular/common';
import { HulkSidebarComponent } from './ui/sidebar/sidebar.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

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
    NzIconModule,
    NzMenuModule,
    NzDropDownModule,
    NzBreadCrumbModule
  ],
  declarations: [LayoutComponent, HulkSidebarComponent, AppHeaderComponent],
  exports: [RouterModule]
})
export class PortalWebShellModule {}
