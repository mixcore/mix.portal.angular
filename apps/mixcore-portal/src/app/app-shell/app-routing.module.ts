import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/portal-cms/portal-cms.module').then(
        (m) => m.PortalCMSModule
      ),
  },
];
