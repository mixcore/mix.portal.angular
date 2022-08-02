import { Route } from '@angular/router';

import { RouteConfig } from '../route.const';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { ListDatabaseComponent } from './list-database/list-database.component';
import { ListModuleComponent } from './list-module/list-module.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ListThemeComponent } from './list-theme/list-theme.component';
import { PostDetailComponent } from './post/detail/post-detail.component';
import { ListPostComponent } from './post/list/list-post.component';

export const PORTAL_ROUTES: Route[] = [
  {
    path: RouteConfig.PortalDashboard,
    component: DashBoardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: RouteConfig.PostList,
    component: ListPostComponent,
    data: {
      title: 'Post list'
    }
  },
  {
    path: RouteConfig.PostDetail,
    component: PostDetailComponent,
    data: {
      title: 'Post'
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
    path: 'list-module',
    component: ListModuleComponent,
    data: {
      title: 'Module list'
    }
  },
  {
    path: 'list-database',
    component: ListDatabaseComponent,
    data: {
      title: 'Databases'
    }
  },
  {
    path: 'list-theme',
    component: ListThemeComponent,
    data: {
      title: 'Themes'
    }
  },
  {
    path: 'list-template/:themeId',
    loadComponent: () =>
      import('./list-template/list-template.component').then(
        c => c.ListTemplateComponent
      ),
    data: {
      title: 'All Template'
    }
  },
  {
    path: 'template/:templateId',
    loadComponent: () =>
      import('./detail-template/detail-template.component').then(
        c => c.MixDetailTemplateComponent
      ),
    data: {
      title: 'Template'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
