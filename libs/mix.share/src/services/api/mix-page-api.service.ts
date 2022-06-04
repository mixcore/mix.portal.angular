import { Injectable } from '@angular/core';
import { MixApiDict, MixPagePortalModel, PaginationRequestModel, PaginationResultModel } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class MixPageApiService extends BaseApiService {
  public getPages(request: PaginationRequestModel): Observable<PaginationResultModel<MixPagePortalModel>> {
    return this.get<PaginationResultModel<MixPagePortalModel>>(MixApiDict.PageApi.getPageEndpoint, <IHttpParamObject>request);
  }
}
