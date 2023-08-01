import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const URL_401 = new InjectionToken<string>('Url to navigate when 401');
export const URL_ERROR = new InjectionToken<string>(
  'Url to navigate when error'
);

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private route: Router,
    @Inject(URL_401) public url401: string,
    @Inject(URL_ERROR) public urlError: string,
    private toast: HotToastService,
    private translate: TranslocoService
  ) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.get('interceptor-bypass')) {
      return next.handle(req);
    }

    const clonedReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `${this.authService.tokenType} ${this.authService.accessToken}`,
      },
    });

    return next.handle(clonedReq).pipe(
      catchError((requestError) => {
        if (
          requestError instanceof HttpErrorResponse &&
          requestError.status === 401
        ) {
          localStorage.setItem('redirectUrl', window.location.pathname);
          this.authService.isAuthorized$.next(false);
          this.route.navigateByUrl(this.url401);
        }

        if (requestError.status === 0) {
          localStorage.setItem('redirectUrl', window.location.pathname);
          this.route.navigateByUrl(this.urlError);
        }

        return throwError(() => requestError);
      }),
      tap((request) => {
        if (request instanceof HttpResponse && request.status === 200) {
          const successMessage = clonedReq.headers.get('requestsuccessmsg');
          if (successMessage) {
            this.toast.success(this.translate.translate(successMessage));
          }
        }
      })
    );
  }
}
