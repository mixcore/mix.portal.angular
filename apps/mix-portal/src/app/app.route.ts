import { Route } from '@angular/router';

import { PortalLayoutComponent } from './routes/portal/portal.component';

export const app_routes: Route[] = [
  {
    path: 'init',
    loadChildren: () => import('./routes/init/init.module').then(m => m.InitModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./routes/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'portal',
    component: PortalLayoutComponent,
    loadChildren: () => import('./routes/portal/portal.module').then(m => m.PortalModule)
  },
  {
    path: '**',
    redirectTo: 'portal'
  }
];
