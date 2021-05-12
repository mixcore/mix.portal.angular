import { Route } from '@angular/router';
import { PortalDocumentComponent } from './document/document.component';
import { PortalDashboardComponent } from './dashboard/dashboard.component';
import { PortalCmsComponent } from './portal-cms.component';
import { MixModuleRepositoryComponent } from './mix-module-repository/mix-module-repository.component';
import { MixPostRepositoryComponent } from './mix-post-repository/mix-post-repository.component';
import { MixPageRepositoryComponent } from './mix-page-repository/mix-page-repository.component';
import { MixNavigationRepositoryComponent } from './mix-navigation-repository/mix-navigation-repository.component';

export const PORTAL_CMS_ROUTES: Route[] = [
  {
    path: '',
    component: PortalCmsComponent,
    children: [
      {
        path: '',
        component: PortalDashboardComponent,
      },
      {
        path: 'document',
        component: PortalDocumentComponent,
      },
      {
        path: 'module',
        component: MixModuleRepositoryComponent,
      },
      {
        path: 'post',
        component: MixPostRepositoryComponent,
      },
      {
        path: 'page',
        component: MixPageRepositoryComponent,
      },
      {
        path: 'navigation',
        component: MixNavigationRepositoryComponent,
      },
    ],
  },
];
