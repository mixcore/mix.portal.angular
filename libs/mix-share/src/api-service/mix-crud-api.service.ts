import { inject } from '@angular/core';
import {
  PaginationRequestModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BaseApiService, IHttpParamObject } from '../bases';
import { Utils } from '../utils';

export class MixRestfulApi<
  T,
  U = PaginationRequestModel
> extends BaseApiService {
  public restUrl = '';
  public resultHandler?: { requestSuccessMsg: string };
  public auth = inject(AuthService);

  constructor(url: string, resultHandler?: { requestSuccessMsg: string }) {
    super();
    this.restUrl = url;
    this.resultHandler = resultHandler;
  }

  public gets(
    request: U,
    withCulture = true
  ): Observable<PaginationResultModel<T>> {
    const query = {
      ...request,
      culture: withCulture ? this.auth.currentCulture?.specificulture : '',
    };

    return this.get<PaginationResultModel<T>>(
      this.restUrl,
      <IHttpParamObject>query
    );
  }

  public filter(request: U): Observable<PaginationResultModel<T>> {
    const query = {
      ...request,
      specificulture: this.auth.currentCulture?.specificulture,
    };

    return this.post<U, PaginationResultModel<T>>(
      this.restUrl + '/filter',
      Utils.clean(query)
    );
  }

  public removeCache(id: number): Observable<void> {
    return this.delete(this.restUrl + '/remove-cache/' + id);
  }

  public getById(id: number): Observable<T> {
    return this.get<T>(`${this.restUrl}/${id}`);
  }

  public deleteById(id: number): Observable<T> {
    return this.delete<T>(`${this.restUrl}/${id}`);
  }

  public saveMany(items: T[]): Observable<void> {
    return this.post(this.restUrl + '/save-many', items);
  }

  public patchField(item: Partial<T>): Observable<void> {
    return this.patch(this.restUrl, item);
  }

  public patchMany(items: Partial<T>[]): Observable<void> {
    return this.patch(this.restUrl + '/patch-many', items);
  }

  public updatePriority(id: number, newPriority: number): Observable<void> {
    return this.put(`${this.restUrl}/update-priority/${id}`, {
      id: id,
      priority: newPriority,
    });
  }

  public getDefault(): Observable<T> {
    return this.get<T>(`${this.restUrl}/default`);
  }

  public save(item: Partial<T>): Observable<T> {
    return this.post<Partial<T>, T>(
      `${this.restUrl}`,
      item,
      undefined,
      undefined,
      this.resultHandler
    );
  }
}
