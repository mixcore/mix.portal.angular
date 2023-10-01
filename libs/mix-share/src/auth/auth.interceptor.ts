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
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';

export const URL_401 = new InjectionToken<string>('Url to navigate when 401');
export const URL_ERROR = new InjectionToken<string>(
  'Url to navigate when error'
);

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(
    private readonly authService: AuthService,
    private route: Router,
    @Inject(URL_401) public url401: string,
    @Inject(URL_ERROR) public urlError: string,
    private toast: HotToastService,
    private translate: TranslocoService
  ) {}

  private _addTokenHeader(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `${this.authService.tokenType} ${this.authService.accessToken}`,
      },
    });
  }

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.get('interceptor-bypass')) {
      return next.handle(req);
    }

    const clonedReq: HttpRequest<unknown> = this._addTokenHeader(req);

    return next.handle(clonedReq).pipe(
      catchError((requestError) => {
        if (
          requestError instanceof HttpErrorResponse &&
          requestError.status === 401
        ) {
          localStorage.setItem('redirectUrl', window.location.pathname);
          return this.handle401Error(clonedReq, next);
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

  public handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.authService.refreshToken;

      if (token) {
        return this.authService.renewToken().pipe(
          switchMap((token) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this._addTokenHeader(request));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.isAuthorized$.next(false);
            this.route.navigateByUrl(this.url401);

            throw new Error(err);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap(() => next.handle(this._addTokenHeader(request)))
    );
  }
}
