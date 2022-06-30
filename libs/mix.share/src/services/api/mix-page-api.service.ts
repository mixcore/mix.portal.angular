import { Injectable } from '@angular/core';
import {
  MixApiDict,
  MixPagePortalModel,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable, tap } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';
import { AppEvent } from '../helper/app-event.service';

@Injectable({ providedIn: 'root' })
export class MixPageApiService extends BaseApiService {
  public getDefaultPageTemplate(): Observable<MixPagePortalModel> {
    return this.get(MixApiDict.PageApi.getDefaultPageEndpoint);
  }

  public getPages(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixPagePortalModel>> {
    return this.get<PaginationResultModel<MixPagePortalModel>>(
      MixApiDict.PageApi.getPageEndpoint,
      <IHttpParamObject>request
    );
  }

  public deletePages(id: number): Observable<void> {
    return this.delete(MixApiDict.PageApi.deletePageEndpoint + id);
  }

  public savePage(data: MixPagePortalModel): Observable<void> {
    return this.post<MixPagePortalModel, void>(
      MixApiDict.PageApi.savePageEndpoint,
      data
    ).pipe(tap(() => this.appEvent.notify(AppEvent.NewPageAdded)));
  }
}
