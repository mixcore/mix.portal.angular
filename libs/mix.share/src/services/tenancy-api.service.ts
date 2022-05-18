import { Injectable } from '@angular/core';
import { IInitFullTenantRequest, InitStep, MixApiDict } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService } from '../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class TenancyApiService extends BaseApiService {
  public initFullTenant(request: IInitFullTenantRequest): Observable<void> {
    return this.post(MixApiDict.TenancyApi.initFullTenantEndpoint, request);
  }

  public getInitStatus(): Observable<InitStep> {
    return this.get(MixApiDict.TenancyApi.getInitStatusEndpoint);
  }
}
