import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ShareModule, SidebarMenuModule } from '@mix-spa/mix.share';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { ListPostComponent } from './list-post/list-post.component';
import { PortalLayoutComponent } from './portal.component';

const routes: Route[] = [
  {
    path: 'dashboard',
    component: DashBoardComponent
  },
  {
    path: 'list-post',
    component: ListPostComponent
  },
  {
    path: '',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ShareModule, ReactiveFormsModule, SidebarMenuModule],
  exports: [],
  providers: [],
  declarations: [PortalLayoutComponent, ListPostComponent, DashBoardComponent]
})
export class PortalModule {}
