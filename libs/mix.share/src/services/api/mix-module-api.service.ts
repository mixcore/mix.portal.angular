import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MixApiDict, MixModulePortalModel, PaginationRequestModel, PaginationResultModel } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases';

@Injectable({ providedIn: 'root' })
export class MixModuleApiService extends BaseApiService {
  public getModules(request: PaginationRequestModel): Observable<PaginationResultModel<MixModulePortalModel>> {
    return this.get<PaginationResultModel<MixModulePortalModel>>(MixApiDict.ModuleApi.getModuleEndpoint, <IHttpParamObject>request);
  }

  public deletePages(id: string): Observable<void> {
    const params = new HttpParams();
    params.set('id', id);

    return this.delete(MixApiDict.ModuleApi.deleteModuleEndpoint, params);
  }
}
