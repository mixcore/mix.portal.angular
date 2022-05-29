import { Injectable } from '@angular/core';
import { MixApiDict, MixPostPortalModel } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService } from '../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class MixPostApiService extends BaseApiService {
  public getDefaultPostTemplate(): Observable<MixPostPortalModel> {
    return this.get(MixApiDict.PostApi.getDefaultPostEndpoint);
  }

  public savePost(data: MixPostPortalModel): Observable<void> {
    return this.post<MixPostPortalModel, void>(MixApiDict.PostApi.savePostEndpoint, data);
  }
}
