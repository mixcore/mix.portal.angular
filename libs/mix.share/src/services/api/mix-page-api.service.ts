import { Injectable } from '@angular/core';
import {
  BaseMixApiDictionary,
  MixApiDict,
  MixPagePortalModel
} from '@mix-spa/mix.lib';

import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class MixPageApiService extends BaseMixApiService<MixPagePortalModel> {
  protected get apiDict(): BaseMixApiDictionary {
    return MixApiDict.PageApi;
  }
}
