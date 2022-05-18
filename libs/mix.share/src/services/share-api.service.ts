import { Injectable } from '@angular/core';
import { Culture, GlobalSettings, IGetAllCultureResult, MixApiDict } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseApiService } from '../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class ShareApiService extends BaseApiService {
  public getCultures(): Observable<Culture[]> {
    return this.get<IGetAllCultureResult>(MixApiDict.ShareApi.getCulturesEndpoint).pipe(map(res => res.items));
  }

  public getGlobalSetting(): Observable<GlobalSettings> {
    return this.get<GlobalSettings>(MixApiDict.ShareApi.getGlobalSettingsEndpoint);
  }
}
