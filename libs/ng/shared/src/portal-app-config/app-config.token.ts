import { InjectionToken, ValueProvider } from '@angular/core';

export interface IPortalAppConfig {
  apiBaseEndpoint: string;
  production: boolean;
}

export const APP_CONFIG: InjectionToken<IPortalAppConfig> = new InjectionToken<IPortalAppConfig>('mix-portal.config');

export const getAppConfigProvider = (value: IPortalAppConfig): ValueProvider => ({
  provide: APP_CONFIG,
  useValue: {
    apiBaseEndpoint: value.apiBaseEndpoint,
    production: value.production
  } as IPortalAppConfig
});
