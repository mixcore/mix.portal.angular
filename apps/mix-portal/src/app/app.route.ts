import { Route } from '@angular/router';

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
    loadComponent: () => import('./routes/portal/portal.layout').then(m => m.PortalLayoutComponent),
    loadChildren: () => import('./routes/portal/portal.routes').then(m => m.PORTAL_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'portal'
  }
];
