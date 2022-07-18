import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  AuthInterceptor,
  BASE_URL,
  DOMAIN_URL,
  GET_THEME_URL,
  MixModalModule
} from '@mix-spa/mix.share';
import {
  defaultEditorExtensions,
  tiptapEditorStyles,
  TUI_EDITOR_EXTENSIONS,
  TUI_EDITOR_STYLES
} from '@taiga-ui/addon-editor';
import {
  TUI_ANIMATIONS_DURATION,
  TuiAlertModule,
  TuiDialogModule
} from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { JoyrideModule } from 'ngx-joyride';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppComponent } from './app/app.layout';
import { app_routes } from './app/app.route';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.baseUrl
    },
    {
      provide: DOMAIN_URL,
      useValue: environment.domainUrl
    },
    {
      provide: GET_THEME_URL,
      useValue: environment.getThemeUrl
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions
    },
    {
      provide: TUI_EDITOR_STYLES,
      useValue: tiptapEditorStyles
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required',
        email: 'Pleas enter a valid email',
        confirm: 'Password confirm incorrect'
      }
    },
    {
      provide: TUI_ANIMATIONS_DURATION,
      useValue: 100
    },
    importProvidersFrom(
      RouterModule.forRoot(app_routes),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        registrationStrategy: 'registerWhenStable:30000'
      }),
      BrowserAnimationsModule,
      HttpClientModule,
      TuiAlertModule,
      TuiDialogModule,
      MixModalModule,
      MonacoEditorModule.forRoot(),
      JoyrideModule.forRoot()
    )
  ]
}).catch(err => console.error(err));
