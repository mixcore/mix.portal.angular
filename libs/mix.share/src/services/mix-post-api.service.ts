import { Injectable } from '@angular/core';
import { MixApiDict, MixPostPortalModel, PaginationRequestModel, PaginationResultModel } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class MixPostApiService extends BaseApiService {
  public getDefaultPostTemplate(): Observable<MixPostPortalModel> {
    return this.get(MixApiDict.PostApi.getDefaultPostEndpoint);
  }

  public savePost(data: MixPostPortalModel): Observable<void> {
    return this.post<MixPostPortalModel, void>(MixApiDict.PostApi.savePostEndpoint, data);
  }

  public getPost(request: PaginationRequestModel): Observable<PaginationResultModel<MixPostPortalModel>> {
    return this.get<PaginationResultModel<MixPostPortalModel>>(MixApiDict.PostApi.getPostEndpoint, <IHttpParamObject>request);
  }
}
