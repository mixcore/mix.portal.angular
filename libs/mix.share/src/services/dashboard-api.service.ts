import { Injectable } from '@angular/core';
import { DashboardInformation, MixApiDict } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService } from '../bases';

@Injectable({ providedIn: 'root' })
export class DashboardApiService extends BaseApiService {
  public getDashboardInfo(): Observable<DashboardInformation> {
    return this.get<DashboardInformation>(MixApiDict.ShareApi.getSharedDashboardInfoEndpoint);
  }
}
