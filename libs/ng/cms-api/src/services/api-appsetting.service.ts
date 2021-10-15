import { APP_CONFIG, IPortalAppConfig } from '@mix-portal/ng/shared';
import { Inject, Injectable } from '@angular/core';

import { BaseBackendService } from '@coreng/angular-core';
import { HttpClient } from '@angular/common/http';
import { ICheckIsSaveDefaultResponse } from '../models/check-save-default-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppSettingApiService extends BaseBackendService {
  protected get apiUrl(): string {
    return `${this.appConfig.apiBaseEndpoint}app-settings`;
  }

  constructor(public http: HttpClient, @Inject(APP_CONFIG) public appConfig: IPortalAppConfig) {
    super(http);
  }

  public checkIsSaveDefault(): Observable<boolean> {
    return this.get<ICheckIsSaveDefaultResponse>('/save-default', null, { shouldShowSpinner: true }).pipe(
      map((res: ICheckIsSaveDefaultResponse) => res.data)
    );
  }
}
