import { Injectable } from '@angular/core';
import { MixPromotion, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { MixSystemDbName } from '../shares/consts/system-database-name';

@Injectable({ providedIn: 'root' })
export class PromotionStore extends BaseCRUDStore<MixPromotion> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.getDataByName<MixPromotion>(
      MixSystemDbName.Promotion,
      {
        ...request,
      }
    );

  //   public override mainUrl = '/' + CMS_ROUTES.portal.promotion.fullPath;
  public override requestName = 'daphalePromotion';
  public override searchColumns = ['Code', 'Type'];
  public override searchColumnsDict: { [key: string]: string } = {
    Code: 'code',
    Type: 'type',
  };
}
