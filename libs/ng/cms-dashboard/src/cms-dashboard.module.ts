/* eslint-disable @typescript-eslint/typedef */
import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DashboardNewsComponent } from './pages/dashboard-news/dashboard-news.component';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

const ROUTE: Route[] = [
  {
    path: '',
    loadChildren: () => import('./pages/main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule)
  },
  {
    path: 'news',
    component: DashboardNewsComponent,
    data: {
      breadcrumb: 'News'
    }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTE), TranslocoModule],
  declarations: [DashboardNewsComponent]
})
export class CmsDashboardModule {}
