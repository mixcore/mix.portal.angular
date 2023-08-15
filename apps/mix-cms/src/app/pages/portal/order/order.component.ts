import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MixContentStatus,
  MixFilter,
  MixOrder,
  OrderStatus,
  OrderStatusDisplay,
  PaymentGateway,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ImageHandleDirective } from '@mixcore/share/directives';
import {
  MixUtcDatePipe,
  RelativeTimePipe,
  RelativeTimeSpanPipe,
} from '@mixcore/share/pipe';
import { DateUtils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixDataTableModule } from '@mixcore/ui/table';
import { EditableModule } from '@ngneat/edit-in-place';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiGroupModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputRangeModule,
  TuiMultiSelectModule,
  TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';
import { debounceTime, interval, takeUntil } from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { BulkAssignMetadataComponent } from '../../../components/bulk-assign-metadata/bulk-assign-metadata.component';
import { CompressImageComponent } from '../../../components/compress-image/compress-image.component';
import { GatewayIndicatorComponent } from '../../../components/gateway-indicator/gateway-indicator.component';
import { OrderStatisticsComponent } from '../../../components/order-statistics/order-statistics.component';
import { OrderStatusIndicatorComponent } from '../../../components/order-status-indicator/order-status-indicator.component';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { ListPageKit } from '../../../shares/kits/list-page-kit.component';
import { OrderStore } from '../../../stores/order.store';

@Component({
  selector: 'mix-order',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    TranslocoModule,
    MixSelectComponent,
    MixDatePickerComponent,
    ReactiveFormsModule,
    TuiHintModule,
    ImageHandleDirective,
    FormsModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiStringifyContentPipeModule,
    CompressImageComponent,
    TuiGroupModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    BulkAssignMetadataComponent,
    TuiDialogModule,
    MixInputComponent,
    EditableModule,
    GatewayIndicatorComponent,
    TuiInputRangeModule,
    OrderStatusIndicatorComponent,
    TuiLinkModule,
    OrderStatisticsComponent,
    MixUtcDatePipe,
    RelativeTimePipe,
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent extends ListPageKit<MixOrder> implements OnInit {
  store = inject(OrderStore);
  mixApi = inject(MixApiFacadeService);
  cdr = inject(ChangeDetectorRef);
  modal = inject(ModalService);

  public currencyOptions: string[] = ['All', 'USD', 'VND'];
  public selectedPosts: MixOrder[] = [];
  public directionOptions: string[] = ['Asc', 'Desc'];
  public gateWayOptions: PaymentGateway[] = [
    PaymentGateway.All,
    PaymentGateway.OnePay,
    PaymentGateway.Paypal,
  ];
  public statusOptions: OrderStatus[] = [
    OrderStatus.All,
    OrderStatus.NEW,
    OrderStatus.WaitingPay,
    OrderStatus.PAID,
    OrderStatus.SUCCESS,
    OrderStatus.CANCELED,
    OrderStatus.SHIPPING,
    OrderStatus.SHIPPING_FAILED,
  ];
  public filterForm = new FormGroup({
    currency: new FormControl('All'),
    status: new FormControl(MixContentStatus.All),
    gateWay: new FormControl(PaymentGateway.All),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    direction: new FormControl(),
    orderBy: new FormControl(),
    totalRange: new FormControl([0, 0]),
  });
  stringify = (item: OrderStatus) => OrderStatusDisplay[item];

  constructor() {
    super({
      contextMenu: [
        {
          label: 'View Info',
          icon: 'info',
          action: (item: MixOrder) => {
            this.goDetail(item.id);
          },
        },
      ],
      searchOptions: ['Order Code', 'Order ID', 'Customer Email'],
      detailUrl: CMS_ROUTES.portal.order.fullPath,
    });
  }
  public control = new FormControl([0, 0]);
  public max = 5_000_000;
  public min = 0;
  public totalSteps = 100;
  public moneyLabels = ['0', '1250000', '2500000', '3750000', '5000000'];
  public segments = this.moneyLabels.length - 1;

  ngOnInit() {
    this.filterForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      const queries: MixFilter[] = [];
      if (value.fromDate) {
        queries.push(<MixFilter>{
          value: DateUtils.setToStartOfDay(value.fromDate),
          compareOperator: 'GreaterThanOrEqual',
          fieldName: 'createdDateTime',
        });
      }

      if (value.gateWay && value.gateWay !== 'All') {
        queries.push(<MixFilter>{
          value: value.gateWay,
          compareOperator: 'InRange',
          fieldName: 'paymentGateway',
        });
      }

      if (value.currency && value.currency !== 'All') {
        queries.push(<MixFilter>{
          value: value.currency,
          compareOperator: 'InRange',
          fieldName: 'currency',
        });
      }

      if (value.status && value.status !== 'All') {
        queries.push(<MixFilter>{
          value: value.status,
          compareOperator: 'InRange',
          fieldName: 'orderStatus',
        });
      }

      if (value.toDate) {
        queries.push(<MixFilter>{
          value: value.toDate,
          compareOperator: 'LessThanOrEqual',
          fieldName: 'createdDateTime',
        });
      }

      const max = value.totalRange?.[1];
      if (max !== undefined && max > 0) {
        queries.push(<MixFilter>{
          value: value.totalRange?.[0] ?? 0,
          compareOperator: 'GreaterThanOrEqual',
          fieldName: 'total',
        });

        queries.push(<MixFilter>{
          value: max,
          compareOperator: 'LessThanOrEqual',
          fieldName: 'total',
        });
      }

      this.store.queryChange(queries);
    });

    interval(300000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.store.reload());
  }
}
