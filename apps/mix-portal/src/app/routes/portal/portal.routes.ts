import { Route } from '@angular/router';

import { DashBoardComponent } from './dashboard/dashboard.component';
import { ListDatabaseComponent } from './list-database/list-database.component';
import { ListModuleComponent } from './list-module/list-module.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ListPostComponent } from './list-post/list-post.component';
import { ListTemplateComponent } from './list-template/list-template.component';
import { ListThemeComponent } from './list-theme/list-theme.component';

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
    component: ListTemplateComponent,
    data: {
      title: 'All Template'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
