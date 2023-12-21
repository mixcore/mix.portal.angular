import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@mixcore/share/auth';
import { filter, map } from 'rxjs';
import { AUTH_ROUTE } from './token';

export const loginPageGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const authRoute = inject(AUTH_ROUTE);

  return auth.isAuthorized$.pipe(
    filter((d) => d !== undefined),
    map((isAuthorized) => {
      if (isAuthorized) router.navigateByUrl(authRoute.authRoute);

      return !isAuthorized;
    })
  );
};

export const notLoginPageGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const authRoute = inject(AUTH_ROUTE);

  return auth.isAuthorized$.pipe(
    filter((d) => d !== undefined),
    map((isAuthorized) => {
      if (!isAuthorized) router.navigateByUrl(authRoute.notAuthRoute);

      return isAuthorized;
    })
  );
};
