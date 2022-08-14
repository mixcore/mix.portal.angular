import { Route } from '@angular/router';

import { RouteConfig } from '../route.const';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { ListDatabaseComponent } from './list-database/list-database.component';
import { ListThemeComponent } from './list-theme/list-theme.component';
import { ModuleDetailComponent } from './module/detail/module-detail.component';
import { ModuleListComponent } from './module/list/module-list.component';
import { PageDetailComponent } from './page/detail/page-detail.component';
import { PageListComponent } from './page/list/page-list.component';
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
  // Post
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
  // Page
  {
    path: RouteConfig.PageList,
    component: PageListComponent,
    data: {
      title: 'Page list'
    }
  },
  {
    path: RouteConfig.PageDetail,
    component: PageDetailComponent,
    data: {
      title: 'Page'
    }
  },
  // Module
  {
    path: RouteConfig.ModuleList,
    component: ModuleListComponent,
    data: {
      title: 'Module list'
    }
  },
  {
    path: RouteConfig.ModuleDetail,
    component: ModuleDetailComponent,
    data: {
      title: 'Module'
    }
  },
  // Database
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
