import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AUTH_ROUTE } from '@mixcore/module/auth';
import {
  AuthInterceptor,
  FULL_MENU,
  PRODUCT_MENU,
  URL_401,
  URL_ERROR,
} from '@mixcore/share/auth';
import {
  BaseAppProvider,
  DOMAIN_URL,
  DOMAIN_URL$,
  FormlyImportModule,
  ToastImportModule,
} from '@mixcore/share/base';
import { MixModalModule } from '@mixcore/ui/modal';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiPortalModule } from '@taiga-ui/cdk';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { TuiPushModule } from '@taiga-ui/kit';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CMS_ROUTES, ROUTES } from './app.routes';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { APP_MENU, APP_NOT_SUPPER_ADMIN_MENU } from './shares/consts/app.menu';

export const domainUrlFactory = () => {
  const url = localStorage.getItem('domainUrl');
  return new BehaviorSubject<string>(url || environment.domainUrl);
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule,
    BrowserModule,
    TuiRootModule,
    MixModalModule,
    TuiAlertModule,
    TuiPortalModule,
    TuiPushModule,
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    TuiDialogModule,
    ToastImportModule,
    FormlyImportModule,
    TranslocoModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:20000',
    }),
    LoadingScreenComponent,
  ],
  providers: [
    ...BaseAppProvider,
    {
      provide: DOMAIN_URL,
      useValue: environment.domainUrl,
    },
    {
      provide: DOMAIN_URL$,
      useFactory: domainUrlFactory,
    },
    {
      provide: URL_401,
      useValue: CMS_ROUTES.auth.login.fullPath,
    },
    {
      provide: URL_ERROR,
      useValue: CMS_ROUTES.error.path,
    },
    {
      provide: FULL_MENU,
      useValue: APP_MENU,
    },
    {
      provide: PRODUCT_MENU,
      useValue: APP_NOT_SUPPER_ADMIN_MENU,
    },
    {
      provide: AUTH_ROUTE,
      useValue: {
        authRoute: CMS_ROUTES.portal.dashboard.fullPath,
        notAuthRoute: CMS_ROUTES.auth.login.fullPath,
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
