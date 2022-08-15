import { Injectable } from '@angular/core';
import {
  MixApiDict,
  MixModulePortalModel,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable, tap } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases';
import { AppEvent } from '../helper/app-event.service';

@Injectable({ providedIn: 'root' })
export class MixModuleApiService extends BaseApiService {
  public getDefaultModuleTemplate(): Observable<MixModulePortalModel> {
    return this.get(MixApiDict.ModuleApi.getDefaultModulePEndpoint);
  }

  public getModules(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixModulePortalModel>> {
    return this.get<PaginationResultModel<MixModulePortalModel>>(
      MixApiDict.ModuleApi.getModuleEndpoint,
      <IHttpParamObject>request
    );
  }

  public getModuleById(id: number): Observable<MixModulePortalModel> {
    return this.get<MixModulePortalModel>(
      MixApiDict.ModuleApi.getModuleById.replace('{id}', id.toString())
    );
  }

  public saveModule(data: MixModulePortalModel): Observable<void> {
    return this.post<MixModulePortalModel, void>(
      MixApiDict.ModuleApi.saveModuleEndpoint,
      data
    ).pipe(tap(() => this.appEvent.notify({ type: AppEvent.NewModuleAdded })));
  }

  public deleteModules(id: number): Observable<void> {
    return this.delete(MixApiDict.ModuleApi.deleteModuleEndpoint + id);
  }
}
