import { Routes } from '@angular/router';
import { CMS_ROUTES } from '../../app.routes';
import { loginPageGuard } from '../../shares/guards/auth-login.guard';

export const AuthRoutes: Routes = [
  {
    path: CMS_ROUTES.auth.login.path,
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [loginPageGuard],
  },
  {
    path: '',
    redirectTo: CMS_ROUTES.auth.login.path,
    pathMatch: 'full',
  },
];
