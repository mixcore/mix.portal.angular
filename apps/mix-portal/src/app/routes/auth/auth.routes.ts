import { Route } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
