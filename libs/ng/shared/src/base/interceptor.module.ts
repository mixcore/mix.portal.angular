import { Injector, NgModule } from '@angular/core';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      deps: [Injector],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      deps: [Injector],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      deps: [Injector],
      multi: true
    }
  ]
})
export class InterceptorModule {}
