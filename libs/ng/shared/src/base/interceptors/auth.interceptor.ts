import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { AUTH_TOKEN_CALLBACK } from '../../constants';
import { BaseInterceptor } from '../base-interceptor';
import { InterceptorType } from '../interceptor-registry';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor extends BaseInterceptor {
  protected key: string = InterceptorType.Authentication;

  constructor(protected injector: Injector) {
    super(injector);
  }

  public handle(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authTokenCallback: () => string = this.injector.get(AUTH_TOKEN_CALLBACK, () => '');
    const authToken: string = authTokenCallback();

    if (authToken) {
      const headers: HttpHeaders = req.headers.set('Authorization', `Bearer ${authToken}`);

      req = req.clone({ headers });
    }

    return next.handle(req);
  }
}
