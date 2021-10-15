import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { DEFAULT_INTERCEPTORS, InterceptorRegistry } from './interceptor.registry';

// Interceptors
export const CORE_INTERCEPTOR_KEYS: string = 'Core-Interceptor-Keys';
export const CORE_SHOULD_SHOW_SPINNER: string = 'Core-Should-Show-Spinner';
export const CORE_SHOULD_HANDLE_ERROR: string = 'Core-Should-Handle-Error';
export const CORE_SHOULD_THROW_BUSINESS_ERROR: string = 'Core-Should-Throw-Business-Error';

export declare type GetParamType = string | boolean | number;

export interface IGetParams {
  [param: string]: GetParamType | GetParamType[] | IGetParams;
}

export interface IHttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  observe?: 'body';
  responseType?: 'json';
}

export interface IRequestOptions {
  shouldShowSpinner?: boolean;
  shouldHandleError?: boolean;
  shouldThrowBusinessError?: boolean;
}

export abstract class BaseBackendService {
  protected get apiUrl(): string {
    return '';
  }

  protected get additionalHttpHeaders(): HttpHeaders | { [header: string]: string | string[] } | null {
    return null;
  }

  private _interceptorRegistry: InterceptorRegistry = new InterceptorRegistry(DEFAULT_INTERCEPTORS);

  constructor(protected http: HttpClient) {}

  public get<TResponse>(url: string, params: IGetParams | null, options?: IRequestOptions): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.apiUrl}${url}`, this.getHttpOptions(this.preprocessData(params), options));
  }

  public post<TBody, TResponse>(
    url: string,
    body: TBody,
    options?: IRequestOptions,
    additionalHttpOptions?: Partial<IHttpOptions>
  ): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiUrl}${url}`, this.preprocessData(body), <IHttpOptions>{
      ...this.getHttpOptions(null, options),
      ...additionalHttpOptions
    });
  }

  public put<TBody, TResponse>(url: string, body: TBody, options?: IRequestOptions): Observable<TResponse> {
    return this.http.put<TResponse>(`${this.apiUrl}${url}`, this.preprocessData(body), this.getHttpOptions(null, options));
  }

  public delete<TResponse>(url: string, options?: IRequestOptions): Observable<TResponse> {
    return this.http.delete<TResponse>(`${this.apiUrl}${url}`, this.getHttpOptions(null, options));
  }

  /**
   * Override this method to set or replace interceptors for current service scope.
   */
  protected onFilterInterceptors(registry: InterceptorRegistry): InterceptorRegistry {
    return registry;
  }

  /**
   * This function will pass the internal headers for checking which interceptors will be run.
   * @see BaseInterceptor
   */
  protected getHttpOptions(params: IGetParams | null, options?: IRequestOptions): IHttpOptions {
    options = {
      ...{
        shouldHandleError: true,
        shouldThrowBusinessError: true,
        shouldShowSpinner: true
      },
      ...options
    };

    const httpOptions: { headers: { [x: string]: string }; params: HttpParams } = {
      headers: {
        [CORE_INTERCEPTOR_KEYS]: this.onFilterInterceptors(this._interceptorRegistry).toJSON(),
        [CORE_SHOULD_HANDLE_ERROR]: options.shouldHandleError?.toString() || '',
        [CORE_SHOULD_THROW_BUSINESS_ERROR]: options.shouldHandleError?.toString() || '',
        [CORE_SHOULD_SHOW_SPINNER]: options.shouldShowSpinner?.toString() || ''
      },
      params: this.parseHttpGetParam(params)
    };

    if (this.additionalHttpHeaders != null) {
      httpOptions.headers = Object.assign({}, httpOptions.headers, this.additionalHttpHeaders);
    }

    return httpOptions;
  }

  /**
   * We remove all null props because it's not necessary. And in server dotnet core, if the data is nullable => default value is null
   * so that do not need to submit null. If data is not nullable, then if submit null can raise exception.
   */
  private preprocessData<T>(data: T): T {
    return data;
  }

  private flattenHttpGetParam(inputParams: IGetParams | null, returnParam: IGetParams = {}, prefix?: string): IGetParams {
    if (inputParams != null) {
      for (const paramKey in inputParams || {}) {
        const inputParamValue: GetParamType | GetParamType[] | IGetParams = inputParams[paramKey];
        const inputParamFinalKey: string = prefix ? `${prefix}.${paramKey}` : paramKey;
        if (inputParamValue instanceof Array) {
          returnParam[inputParamFinalKey] = inputParamValue;
        } else if (typeof inputParamValue === 'object') {
          this.flattenHttpGetParam(inputParamValue, returnParam, paramKey);
        } else if (inputParamValue != null) {
          returnParam[inputParamFinalKey] = inputParamValue.toString();
        }
      }
    }

    return returnParam;
  }

  private parseHttpGetParam(inputParams: IGetParams | null): HttpParams {
    let returnParam: HttpParams = new HttpParams();
    const flattenedInputParams: IGetParams = this.flattenHttpGetParam(inputParams);
    for (const paramKey in flattenedInputParams) {
      if (Object.prototype.hasOwnProperty.call(flattenedInputParams, paramKey)) {
        const inputParamValue: GetParamType | GetParamType[] | IGetParams = flattenedInputParams[paramKey];
        if (inputParamValue instanceof Array) {
          inputParamValue.forEach((p: GetParamType) => {
            returnParam = returnParam.append(paramKey, p.toString());
          });
        } else {
          returnParam = returnParam.append(paramKey, inputParamValue.toString());
        }
      }
    }

    return returnParam;
  }
}
