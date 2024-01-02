import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then((c) => c.UserComponent),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
