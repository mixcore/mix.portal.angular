import { Injectable } from '@angular/core';
import {
  BaseMixApiDictionary,
  MixApiDict,
  MixModulePortalModel
} from '@mix-spa/mix.lib';

import { BaseMixApiService } from './base-mix-api.service';

@Injectable({ providedIn: 'root' })
export class MixModuleApiService extends BaseMixApiService<MixModulePortalModel> {
  protected get apiDict(): BaseMixApiDictionary {
    return MixApiDict.ModuleApi;
  }
}
