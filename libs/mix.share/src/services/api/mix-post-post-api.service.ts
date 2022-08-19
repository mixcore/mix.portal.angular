import { Injectable } from '@angular/core';
import {
  IGetReferenceTableRequest,
  MixApiDict,
  MixPostReferenceModel,
  PaginationResultModel,
  PostPostApiDictionary
} from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { IHttpParamObject } from '../../bases/base-api.service';
import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class MixPostPostApiService extends BaseMixApiService<MixPostReferenceModel> {
  protected get apiDict(): PostPostApiDictionary {
    return MixApiDict.PostPostApi;
  }

  public search(
    request: IGetReferenceTableRequest
  ): Observable<PaginationResultModel<MixPostReferenceModel>> {
    return this.get(
      this.apiDict.searchEndpoint,
      request as unknown as IHttpParamObject
    );
  }
}
