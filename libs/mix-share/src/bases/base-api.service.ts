import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

export const DOMAIN_URL = new InjectionToken<string>('domain url endpoint');
export const DOMAIN_URL$ = new InjectionToken<BehaviorSubject<string>>(
  'domain url endpoint with factory'
);

export interface IHttpParamObject {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
}

export interface IHttpHeadersObject {
  [header: string]: string | string[];
}

export interface IHttpOptions {
  headers?: HttpHeaders | IHttpHeadersObject;
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | IHttpParamObject;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BaseApiService {
  public domainUrl = inject(DOMAIN_URL);
  public domainUrl$ = inject(DOMAIN_URL$);
  public http = inject(HttpClient);

  protected get url(): string {
    return this.domainUrl$.getValue();
  }

  public get<TResult>(
    path: string,
    params?: IHttpParamObject,
    ignoreValidate?: boolean
  ): Observable<TResult> {
    return this.http
      .get<TResult>(
        this.url + path,
        this.getHttpOptions(params, false, ignoreValidate)
      )
      .pipe(catchError(this.handleError));
  }

  public post<TRequest, TResult>(
    path: string,
    request: TRequest,
    params?: HttpParams | IHttpParamObject,
    isRepsonseText?: boolean,
    customHeaders?: Record<string, any>
  ): Observable<TResult> {
    return this.http
      .post<TResult>(
        this.url + path,
        request,
        this.getHttpOptions(params, isRepsonseText, false, customHeaders)
      )
      .pipe(catchError(this.handleError));
  }

  public put<TRequest, TResult>(
    path: string,
    request: TRequest,
    params?: HttpParams | IHttpParamObject,
    customHeaders?: Record<string, any>
  ): Observable<TResult> {
    return this.http
      .put<TResult>(
        this.url + path,
        request,
        this.getHttpOptions(params, false, false, customHeaders)
      )
      .pipe(catchError(this.handleError));
  }

  public patch<TRequest, TResult>(
    path: string,
    request: TRequest,
    params?: HttpParams | IHttpParamObject,
    customHeaders?: Record<string, any>
  ): Observable<TResult> {
    return this.http
      .patch<TResult>(
        this.url + path,
        request,
        this.getHttpOptions(params, false, false, customHeaders)
      )
      .pipe(catchError(this.handleError));
  }

  public delete<TResult>(
    path: string,
    params?: HttpParams | IHttpParamObject
  ): Observable<TResult> {
    return this.http
      .delete<TResult>(this.url + path, this.getHttpOptions(params))
      .pipe(catchError(this.handleError));
  }

  private getHttpOptions(
    customParams?: HttpParams | IHttpParamObject,
    isText?: boolean,
    ignoreValidate?: boolean,
    customHeaders?: Record<string, any>
  ): IHttpOptions {
    let params: HttpParams = new HttpParams();

    if (customParams) {
      params = new HttpParams({
        fromObject: customParams as unknown as IHttpParamObject,
      });
    }

    const headers: any = {
      'Content-Type': isText ? 'text/plain' : 'application/json',
      'ignore-validate': ignoreValidate ? 'true' : 'false',
    };

    if (customHeaders) {
      Object.keys(customHeaders).forEach((key) => {
        headers[key] = customHeaders[key].toString();
      });
    }

    return {
      params,
      headers: headers,
    };
  }

  private handleError(error: Error) {
    return throwError(() => error);
  }
}
