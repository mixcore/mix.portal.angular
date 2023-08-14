import { Injectable } from '@angular/core';
import { MixOrder, PaginationRequestModel } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../app.routes';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class OrderStore extends BaseCRUDStore<MixOrder> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.getDataByName<MixOrder>('OrderDetail', {
      ...request,
    });

  public override mainUrl = '/' + CMS_ROUTES.portal.order.fullPath;
  public override requestName = 'order';

  public override searchColumns = ['Order Code', 'Order ID', 'Customer Email'];
  public override searchColumnsDict: { [key: string]: string } = {
    'Order Code': 'code',
    'Order ID': 'id',
    'Customer Email': 'email',
  };
}
