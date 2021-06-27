import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DashboardNewsComponent } from './pages/dashboard-news/dashboard-news.component';
import { MainDashboardComponent } from './pages/main-dashboard/main-dashboard.component';
import { NgModule } from '@angular/core';

const ROUTE: Route[] = [
  {
    path: '',
    component: MainDashboardComponent
  },
  {
    path: 'news',
    component: DashboardNewsComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTE)],
  declarations: [MainDashboardComponent, DashboardNewsComponent]
})
export class CmsDashboardModule {}
