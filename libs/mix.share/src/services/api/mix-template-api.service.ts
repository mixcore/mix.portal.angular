import { Injectable } from '@angular/core';
import {
  BaseMixApiDictionary,
  IGetTemplatesRequest,
  MixApiDict,
  MixTemplateModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { IHttpParamObject } from '../../bases';
import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class MixTemplateApiService extends BaseMixApiService<MixTemplateModel> {
  protected get apiDict(): BaseMixApiDictionary {
    return MixApiDict.TemplateApi;
  }

  public override gets(
    request: IGetTemplatesRequest
  ): Observable<PaginationResultModel<MixTemplateModel>> {
    return this.get<PaginationResultModel<MixTemplateModel>>(
      this.apiDict.getEndpoint,
      request as unknown as IHttpParamObject
    );
  }
}
