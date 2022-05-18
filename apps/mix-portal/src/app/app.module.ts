import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthInterceptor, BASE_URL, MixModalModule } from '@mix-spa/mix.share';
import { TuiAlertModule, TuiRootModule } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { app_routes } from './app.route';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(app_routes),
    TuiRootModule,
    TuiAlertModule,
    MixModalModule
  ],
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
