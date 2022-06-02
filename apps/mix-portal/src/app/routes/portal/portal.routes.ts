import { Route } from '@angular/router';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ListPostComponent } from './list-post/list-post.component';

export const PORTAL_ROUTES: Route[] = [
  {
    path: 'dashboard',
    component: DashBoardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'list-post',
    component: ListPostComponent,
    data: {
      title: 'Post list'
    }
  },
  {
    path: 'list-page',
    component: ListPageComponent,
    data: {
      title: 'Page list'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
