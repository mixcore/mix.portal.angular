import { Injectable } from '@angular/core';
import { MixOrder, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class OrderStore extends BaseCRUDStore<MixOrder> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.getDataByName<MixOrder>('OrderDetail', {
      ...request,
    });

  //   public override mainUrl = '/' + CMS_ROUTES.portal.order.fullPath;
  public override requestName = 'order';
  public override searchColumns = ['Order Code', 'Order ID', 'Customer Email'];
  public override searchColumnsDict: { [key: string]: string } = {
    'Order Code': 'code',
    'Order ID': 'id',
    'Customer Email': 'email',
  };
}
