import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MixApiDict, MixPagePortalModel, PaginationRequestModel, PaginationResultModel } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class MixPageApiService extends BaseApiService {
  public getPages(request: PaginationRequestModel): Observable<PaginationResultModel<MixPagePortalModel>> {
    return this.get<PaginationResultModel<MixPagePortalModel>>(MixApiDict.PageApi.getPageEndpoint, <IHttpParamObject>request);
  }

  public deletePages(id: string): Observable<void> {
    const params = new HttpParams();
    params.set('id', id);

    return this.delete(MixApiDict.PageApi.deletePageEndpoint, params);
  }
}
