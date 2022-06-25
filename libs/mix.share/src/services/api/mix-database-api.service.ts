import { Injectable } from '@angular/core';
import {
  MixApiDict,
  MixDatabaseModel,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class DatabaseApiService extends BaseApiService {
  public getDatabase(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixDatabaseModel>> {
    return this.get<PaginationResultModel<MixDatabaseModel>>(
      MixApiDict.DatabaseApi.getDatabasesEndpoint,
      <IHttpParamObject>request
    );
  }
}
