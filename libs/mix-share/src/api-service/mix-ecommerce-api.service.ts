import {
  MixFilter,
  MixOrder,
  OrderStatus,
  PaymentGateway,
} from '@mixcore/lib/model';
import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable, map } from 'rxjs';
import { BaseApiService } from '../bases';
import { MixDatabaseApi } from './database-api.service';

export class MixeCommerce extends BaseApiService {
  public databaseApi = new MixDatabaseApi(MixSwagger.content.database);

  public sendDeliveryCodeMail(
    orderId: number,
    deliveryCode: string
  ): Observable<void> {
    const request = {
      orderId: orderId,
      deliveryCode: deliveryCode,
    };

    return this.post(MixSwagger.ecommerce.updateDeliveryCode, request);
  }

  public countStatus(
    status: OrderStatus,
    fromDate: Date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
  ): Observable<number> {
    const queries = <MixFilter[]>[
      {
        value: fromDate,
        compareOperator: 'GreaterThanOrEqual',
        fieldName: 'createdDateTime',
      },
      {
        value: status,
        compareOperator: 'InRange',
        fieldName: 'orderStatus',
      },
    ];

    return this.databaseApi
      .getDataByName<MixOrder>('OrderDetail', {
        pageIndex: 0,
        pageSize: 5,
        queries: queries,
      })
      .pipe(map((r) => r.pagingData.total || 0));
  }

  public countGateWay(
    gateWay: PaymentGateway,
    fromDate: Date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
  ): Observable<number> {
    const queries = <MixFilter[]>[
      {
        value: fromDate,
        compareOperator: 'GreaterThanOrEqual',
        fieldName: 'createdDateTime',
      },
      {
        value: gateWay,
        compareOperator: 'InRange',
        fieldName: 'paymentGateway',
      },
    ];

    return this.databaseApi
      .getDataByName<MixOrder>('OrderDetail', {
        pageIndex: 0,
        pageSize: 1,
        queries: queries,
      })
      .pipe(map((r) => r.pagingData.total || 0));
  }
}
