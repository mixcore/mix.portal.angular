import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { AppEventService } from '../services';
import { BASE_URL } from '../token';

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

export interface IGetWithPaginationRequest {
  searchText?: string;
  searchId?: string;
  skipCount?: number;
  maxResultCount?: number;
  handleAuditedTrackId?: string;
  handleAuditedDate?: string;
  handleAuditedByUserId?: string;
}

export interface IGetWithPaginationResult<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class BaseApiService {
  protected get url(): string {
    return this.baseUrl;
  }

  constructor(
    protected readonly http: HttpClient,
    @Inject(BASE_URL) public baseUrl: string,
    public appEvent: AppEventService
  ) {}

  public get<TResult>(
    path: string,
    params?: IHttpParamObject
  ): Observable<TResult> {
    return this.http
      .get<TResult>(this.url + path, this.getHttpOptions(params))
      .pipe(catchError(this.handleError));
  }

  public post<TRequest, TResult>(
    path: string,
    request: TRequest,
    params?: HttpParams | IHttpParamObject
  ): Observable<TResult> {
    return this.http
      .post<TResult>(this.url + path, request, this.getHttpOptions(params))
      .pipe(catchError(this.handleError));
  }

  public put<TRequest, TResult>(
    path: string,
    request: TRequest,
    params?: HttpParams | IHttpParamObject
  ): Observable<TResult> {
    return this.http
      .put<TResult>(
        this.url + path,
        { data: request },
        this.getHttpOptions(params)
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
    customParams?: HttpParams | IHttpParamObject
  ): IHttpOptions {
    let params: HttpParams = new HttpParams();

    if (customParams) {
      params = new HttpParams({
        fromObject: customParams as unknown as IHttpParamObject
      });
    }

    return { params, headers: { 'Content-Type': 'application/json' } };
  }

  private handleError(error: Error) {
    return throwError(() => error);
  }
}
