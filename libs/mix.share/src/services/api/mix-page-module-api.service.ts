import { Injectable } from '@angular/core';
import {
  IGetReferenceTableRequest,
  MixApiDict,
  MixPageReferenceModel,
  PageModuleApiDictionary,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { IHttpParamObject } from '../../bases/base-api.service';
import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class MixPageModuleApiService extends BaseMixApiService<MixPageReferenceModel> {
  protected get apiDict(): PageModuleApiDictionary {
    return MixApiDict.PageModuleApi;
  }

  public search(
    request: IGetReferenceTableRequest
  ): Observable<PaginationResultModel<MixPageReferenceModel>> {
    return this.get(
      this.apiDict.searchEndpoint,
      request as unknown as IHttpParamObject
    );
  }
}
