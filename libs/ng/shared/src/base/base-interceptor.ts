import {
  CORE_INTERCEPTOR_KEYS,
  CORE_SHOULD_HANDLE_ERROR,
  CORE_SHOULD_SHOW_SPINNER,
  CORE_SHOULD_THROW_BUSINESS_ERROR
} from './base-backend.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export abstract class BaseInterceptor implements HttpInterceptor {
  protected abstract key: string;

  constructor(protected injector: Injector) {}

  /**
   * When a service extends @see BaseBackendService, it can indicates which interceptors will be run or not.
   * This base function gets the FW_INTERCEPTOR_KEYS key in request headers and checks if this interceptor existed and can run.
   * The FW_INTERCEPTOR_KEYS header is passed from @see BaseBackendService by @see InterceptorRegistry.
   */
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const interceptorsJson: string | null = req.headers.get(CORE_INTERCEPTOR_KEYS);

    if (interceptorsJson) {
      const interceptorKeys: string[] = JSON.parse(interceptorsJson) as string[];

      if (interceptorKeys.some((key: string) => key === this.key)) {
        this.processHeaders(req.headers);

        const interceptors: HttpInterceptor[] = this.injector.get(HTTP_INTERCEPTORS, []);

        /**
         * To avoid cross origin headers not accepted issue in backend side,
         * we must remove the internal headers if the current interceptor is the last one before the request is sent to the server.
         */
        if (this === interceptors[interceptors.length - 1]) {
          const headers: HttpHeaders = req.headers
            .delete(CORE_INTERCEPTOR_KEYS)
            .delete(CORE_SHOULD_SHOW_SPINNER)
            .delete(CORE_SHOULD_HANDLE_ERROR)
            .delete(CORE_SHOULD_THROW_BUSINESS_ERROR);

          req = req.clone({ headers: headers });
        }

        return this.handle(req, next).pipe(finalize(() => this.finalize()));
      }
    }

    return next.handle(req).pipe(finalize(() => this.finalize()));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected processHeaders(headers: HttpHeaders): void {
    // Virtual method
  }

  protected finalize(): void {
    // Virtual method
  }

  protected abstract handle(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>;
}
