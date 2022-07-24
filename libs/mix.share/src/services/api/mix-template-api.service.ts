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

  public saveTemplate(template: MixTemplateModel): Observable<number> {
    return this.post<MixTemplateModel, number>(
      MixApiDict.TemplateApi.prefix,
      template
    );
  }

  public getTemplateDefault(): Observable<MixTemplateModel> {
    return this.get(MixApiDict.TemplateApi.getTemplateDefaultEndpoint);
  }

  public deleteTemplate(id: number): Observable<void> {
    return this.delete(MixApiDict.TemplateApi.deleteTemplateByIdEndpoint(id));
  }
}
