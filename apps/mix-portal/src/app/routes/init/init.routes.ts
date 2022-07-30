import { Route } from '@angular/router';

import { InitComponent } from './init-site/init.component';
import { SetupThemeComponent } from './setup-theme/setup-theme.component';

export const ROUTES: Route[] = [
  {
    path: 'setup-theme',
    component: SetupThemeComponent
  },
  {
    path: '',
    component: InitComponent
  }
];
