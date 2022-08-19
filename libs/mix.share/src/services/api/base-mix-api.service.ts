import { Injectable } from '@angular/core';
import {
  BaseMixApiDictionary,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases';

@Injectable()
export abstract class BaseMixApiService<T> extends BaseApiService {
  protected abstract get apiDict(): BaseMixApiDictionary;

  public getDefault(): Observable<T> {
    return this.get(this.apiDict.getDefaultEndpoint);
  }

  public save(data: T): Observable<T> {
    return this.post<T, T>(this.apiDict.saveEndpoint, data);
  }

  public gets(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<T>> {
    return this.get<PaginationResultModel<T>>(
      this.apiDict.getEndpoint,
      <IHttpParamObject>request
    );
  }

  public remove(id: number): Observable<void> {
    return this.delete(this.apiDict.deleteEndpoint + id);
  }

  public getById(id: number): Observable<T> {
    return this.get(this.apiDict.getByIdEndpoint(id));
  }
}
