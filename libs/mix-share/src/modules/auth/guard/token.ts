import { InjectionToken } from '@angular/core';

// Default route if authenticated
export const AUTH_ROUTE = new InjectionToken<{
  authRoute: string;
  notAuthRoute: string;
}>('Default route if authenticated and login route if not');
