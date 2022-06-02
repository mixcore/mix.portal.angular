import { Route } from '@angular/router';

export const app_routes: Route[] = [
  {
    path: 'init',
    loadChildren: () => import('./routes/init/init.routes').then(m => m.ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./routes/auth/auth.routes').then(m => m.ROUTES)
  },
  {
    path: 'portal',
    data: {
      title: 'CMS'
    },
    loadComponent: () => import('./routes/portal/portal.layout').then(m => m.PortalLayoutComponent),
    loadChildren: () => import('./routes/portal/portal.routes').then(m => m.PORTAL_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'portal'
  }
];
