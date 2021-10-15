import { APP_CONFIG, IPortalAppConfig, InitStatus } from '@mix-portal/ng/shared';
import { BaseBackendService, IRequestOptions } from '@coreng/angular-core';
import { IInitAccountRequest, IInitSiteRequest } from '../request';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InitApiService extends BaseBackendService {
  public initStatus: InitStatus | undefined;

  protected get apiUrl(): string {
    return `${this.appConfig.apiBaseEndpoint}/mix-theme/setup`;
  }

  constructor(public http: HttpClient, @Inject(APP_CONFIG) public appConfig: IPortalAppConfig) {
    super(http);
  }

  public getInitStatus(options?: IRequestOptions): Observable<InitStatus> {
    if (this.initStatus) {
      return of(this.initStatus);
    }

    return this.get<InitStatus>('/get-init-status', null, options).pipe(
      tap(res => {
        this.initStatus = res;
      })
    );
  }

  public initSite(request: IInitSiteRequest, options?: IRequestOptions): Observable<void> {
    return this.post<IInitSiteRequest, void>('/init-site', request, options);
  }

  public initAccount(request: IInitAccountRequest, options?: IRequestOptions): Observable<void> {
    return this.post<IInitAccountRequest, void>('/init-account', request, options);
  }
}
