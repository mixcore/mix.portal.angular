import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DashboardNewsComponent } from './pages/dashboard-news/dashboard-news.component';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

const ROUTE: Route[] = [
  {
    path: '',
    component: MainDashboardComponent
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
  declarations: [MainDashboardComponent, DashboardNewsComponent]
})
export class CmsDashboardModule {}
