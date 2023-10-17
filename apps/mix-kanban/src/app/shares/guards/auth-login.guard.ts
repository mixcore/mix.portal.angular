import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@mixcore/share/auth';
import { filter, map } from 'rxjs';
import { CMS_ROUTES } from '../../app.routes';

export const loginPageGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthorized$.pipe(
    filter((d) => d !== undefined),
    map((isAuthorized) => {
      if (isAuthorized)
        router.navigateByUrl('/' + CMS_ROUTES.portal.dashboard.fullPath);

      return !isAuthorized;
    })
  );
};

export const portalPageGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthorized$.pipe(
    filter((d) => d !== undefined),
    map((isAuthorized) => {
      if (!isAuthorized)
        router.navigateByUrl('/' + CMS_ROUTES.auth.login.fullPath);

      return isAuthorized;
    })
  );
};
