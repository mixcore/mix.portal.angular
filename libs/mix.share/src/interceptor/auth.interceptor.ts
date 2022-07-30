import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { AuthApiService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthApiService,
    private route: Router
  ) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clonedReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `${this.authService.getTokenType} ${this.authService.getAccessToken}`
      }
    });

    return next.handle(clonedReq).pipe(
      catchError(requestError => {
        if (
          requestError instanceof HttpErrorResponse &&
          requestError.status === 401
        ) {
          localStorage.setItem('redirectUrl', window.location.pathname);
          this.route.navigateByUrl('/auth/login');
        }

        return throwError(() => new Error(requestError));
      })
    );
  }
}
