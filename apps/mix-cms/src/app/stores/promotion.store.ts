import { Injectable } from '@angular/core';
import { MixPromotion, PaginationRequestModel } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../app.routes';
import { MixSystemDbName } from '../shares/consts/system-database-name';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class PromotionStore extends BaseCRUDStore<MixPromotion> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.getDataByName<MixPromotion>(
      MixSystemDbName.Promotion,
      {
        ...request,
      }
    );

  public override mainUrl = '/' + CMS_ROUTES.portal.promotion.fullPath;
  public override requestName = 'daphalePromotion';
}