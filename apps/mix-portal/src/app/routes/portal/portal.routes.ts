import { Route } from '@angular/router';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { ListPostComponent } from './list-post/list-post.component';

export const PORTAL_ROUTES: Route[] = [
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
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
