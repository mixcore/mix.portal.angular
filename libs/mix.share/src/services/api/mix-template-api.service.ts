import { Injectable } from '@angular/core';
import {
  IGetTemplatesRequest,
  MixApiDict,
  MixTemplateModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases';

@Injectable({ providedIn: 'root' })
export class MixTemplateApiService extends BaseApiService {
  public getTemplates(
    request: IGetTemplatesRequest
  ): Observable<PaginationResultModel<MixTemplateModel>> {
    return this.get(
      MixApiDict.TemplateApi.getTemplateEndpoint,
      request as unknown as IHttpParamObject
    );
  }

  public getTemplateById(id: string): Observable<MixTemplateModel> {
    return this.get(MixApiDict.TemplateApi.getTemplateByIdEndpoint(id));
  }
}
