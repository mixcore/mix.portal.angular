import { CORE_SHOULD_HANDLE_ERROR, CORE_SHOULD_THROW_BUSINESS_ERROR } from '../base-backend.service';
import { EMPTY, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { BaseInterceptor } from '../base-interceptor';
import { ERROR_HANDLING_CALLBACK } from '../../constants/tokens';
import { IBaseResponse } from '../base-response';
import { InterceptorType } from '../interceptor.registry';

export enum HttpStatusCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  BadGateway = 502
}

@Injectable()
export class ErrorHandlingInterceptor extends BaseInterceptor {
  protected key: string = InterceptorType.ErrorHandling;
  private _shouldHandleError: boolean = true;
  private _shouldThrowBusinessError: boolean = true;
  constructor(protected injector: Injector) {
    super(injector);
  }

  public handle(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (this._shouldThrowBusinessError) {
          if (event instanceof HttpResponse) {
            const body: IBaseResponse = event.body as IBaseResponse;
            if (body?.errors?.length > 0) {
              throwError(body.errors);
            }
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (this._shouldHandleError) {
          const errorHandlingCallback: ((response: HttpErrorResponse) => void) | null = this.injector.get(ERROR_HANDLING_CALLBACK, null);

          if (errorHandlingCallback) {
            errorHandlingCallback(error);
          }

          return EMPTY;
        }

        return throwError(error);
      })
    );
  }

  protected processHeaders(headers: HttpHeaders): void {
    this._shouldHandleError = headers.get(CORE_SHOULD_HANDLE_ERROR) === 'true';
    this._shouldThrowBusinessError = headers.get(CORE_SHOULD_THROW_BUSINESS_ERROR) === 'true';
  }
}
