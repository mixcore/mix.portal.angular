import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthInterceptor, BASE_URL, MixModalModule } from '@mix-spa/mix.share';
import { TuiAlertModule } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

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
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required',
        email: 'Pleas enter a valid email',
        confirm: 'Password confirm incorrect'
      }
    },
    importProvidersFrom(RouterModule.forRoot(app_routes), BrowserAnimationsModule, HttpClientModule, TuiAlertModule, MixModalModule)
  ]
}).catch(err => console.error(err));
