import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MetadataQuery, MixOrder, OrderStatus } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';

@Component({
  selector: 'mix-order-statistics',
  standalone: true,
  imports: [CommonModule, SkeletonLoadingComponent],
  templateUrl: './order-statistics.component.html',
  styleUrls: ['./order-statistics.component.scss'],
})
export class OrderStatisticsComponent extends BaseComponent implements OnInit {
  mixApi = inject(MixApiFacadeService);
  public totalFail = signal(0);
  public monthlyQueries: MetadataQuery[] = [
    {
      value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      compareOperator: 'GreaterThanOrEqual',
      fieldName: 'createdDateTime',
    },
  ];

  public totalSuccess$ = this.mixApi.eCommerce.countStatus(OrderStatus.SUCCESS);
  public totalPaid$ = this.mixApi.eCommerce.countStatus(OrderStatus.PAID);
  public totalWaitToPay$ = this.mixApi.eCommerce.countStatus(
    OrderStatus.WaitingPay
  );
  public totalShipping$ = this.mixApi.eCommerce.countStatus(
    OrderStatus.SHIPPING
  );
  public totalCanceled$ = this.mixApi.eCommerce.countStatus(
    OrderStatus.CANCELED
  );

  ngOnInit() {
    this.countFail();
  }

  public countFail() {
    const queries = [
      ...this.monthlyQueries,
      <MetadataQuery>{
        value: `${OrderStatus.PAYMENT_FAILED},${OrderStatus.SHIPPING_FAILED}`,
        compareOperator: 'InRange',
        fieldName: 'orderStatus',
      },
    ];

    this.mixApi.databaseApi
      .getDataByName<MixOrder>('OrderDetail', {
        pageIndex: 0,
        pageSize: 5,
        queries: queries,
      })
      .subscribe((result) => {
        this.totalFail.set(result.pagingData.total ?? 0);
      });
  }
}
