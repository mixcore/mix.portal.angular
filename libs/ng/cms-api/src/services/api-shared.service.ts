import { APP_CONFIG, Culture, ICulture, IPortalAppConfig } from '@mix-portal/ng/shared';
import { Inject, Injectable } from '@angular/core';

import { BaseBackendService } from '@coreng/angular-core';
import { HttpClient } from '@angular/common/http';
import { IGetCultureResponse } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService extends BaseBackendService {
  protected get apiUrl(): string {
    return `${this.appConfig.apiBaseEndpoint}/shared`;
  }

  constructor(public http: HttpClient, @Inject(APP_CONFIG) public appConfig: IPortalAppConfig) {
    super(http);
  }

  public getCultures(): Observable<Culture[]> {
    return this.get<IGetCultureResponse>('/json-data/cultures', null, { shouldShowSpinner: true }).pipe(
      map((res: IGetCultureResponse) => res.items.map((cul: ICulture) => new Culture(cul)))
    );
  }
}
