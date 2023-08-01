import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MixOrder, OrderItem, OrderStatusDisplay } from '@mixcore/lib/model';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { HotToastService } from '@ngneat/hot-toast';
import {
  TuiLinkModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiTabsModule, TuiToggleModule } from '@taiga-ui/kit';
import { delay, switchMap } from 'rxjs';
import { DynamicDbListComponent } from '../../../../components/dynamic-db-list/dynamic-db-list.component';
import { GatewayIndicatorComponent } from '../../../../components/gateway-indicator/gateway-indicator.component';
import { OrderStatusIndicatorComponent } from '../../../../components/order-status-indicator/order-status-indicator.component';
import { MixSystemDbName } from '../../../../shares/consts/system-database-name';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';

@Component({
  selector: 'mix-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    TuiTabsModule,
    MixButtonComponent,
    MixTextAreaComponent,
    MixEditorComponent,
    FormsModule,
    TuiScrollbarModule,
    TuiLoaderModule,
    ReactiveFormsModule,
    MixSelectComponent,
    TuiToggleModule,
    OrderStatusIndicatorComponent,
    DynamicDbListComponent,
    GatewayIndicatorComponent,
    MixInputComponent,
    TuiLinkModule,
    ImageHandleDirective,
  ],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent extends DetailPageKit {
  toast = inject(HotToastService);

  public form = new FormGroup({});
  public data = signal<MixOrder | undefined>(undefined);
  public ORDER_DISPLAY = OrderStatusDisplay;

  public orderItems = signal<OrderItem[]>([]);
  public otherItems = signal<OrderItem[]>([]);
  public promotionItems = signal<OrderItem[]>([]);

  public deliveryCodeForm = new FormControl('');
  public defaultDeliveryCode = '';
  public sendingCode = signal(false);

  constructor() {
    super();

    this.activeRoute.params.subscribe((param) => {
      this.id = param['id'];
      this.loadData();
    });
  }

  public get canSaveAndSend(): boolean {
    return this.defaultDeliveryCode !== this.deliveryCodeForm.value;
  }

  public loadData() {
    if (!this.id) return;

    this.mixApi.databaseApi
      .getData<MixOrder>(MixSystemDbName.Order, this.id)
      .pipe(this.observerLoadingStateSignal())
      .subscribe((v) => {
        this.data.set(v);
        this.deliveryCodeForm.patchValue(v.deliveryCode, { emitEvent: false });
        this.defaultDeliveryCode = v.deliveryCode;
      });

    this.loadOrderItems();
  }

  public loadOrderItems() {
    if (!this.id) return;

    this.mixApi.databaseApi
      .getDataByName<OrderItem>(MixSystemDbName.OrderItem, {
        pageIndex: 0,
        pageSize: 50,
        parentId: this.id,
        parentName: MixSystemDbName.Order,
      })
      .subscribe((result) => {
        this.orderItems.set(
          result.items
            .filter((item) => item.itemType === 'PRODUCT')
            .map((item) => ({
              ...item,
              color:
                this.extractColorCodeFromString(item.description) ||
                item.colorCode,
            }))
        );

        this.otherItems.set(
          result.items.filter((item) => item.itemType === 'SHIPPING')
        );

        this.promotionItems.set(
          result.items.filter((item) => item.itemType === 'PROMOTION')
        );
      });
  }

  public sendDeliveryCode() {
    const code = this.deliveryCodeForm.value;
    if (!code || this.id === undefined) return;

    this.sendingCode.set(true);
    this.mixApi.databaseApi
      .patchData(MixSystemDbName.Order, this.id, {
        deliveryCode: code,
      })
      .pipe(
        delay(2000),
        switchMap(() =>
          this.mixApi.eCommerce.sendDeliveryCodeMail(this.id as any, code)
        ),
        this.toast.observe({
          loading: 'Sending',
          success: `Deliver Code email sent successful.`,
          error: () => {
            return 'Delivery Code email cannot be sent.';
          },
        })
      )
      .subscribe({
        next: () => {
          this.sendingCode.set(false);
          this.defaultDeliveryCode = code;
        },
        error: () => {
          this.sendingCode.set(false);
        },
        complete: () => {
          this.sendingCode.set(false);
        },
      });
  }

  public extractColorCodeFromString(inputString: string) {
    const colorCodeRegex = /#[a-fA-F0-9]{6}\b/;
    const matches = inputString.match(colorCodeRegex);

    if (matches && matches.length > 0) {
      return matches[0];
    } else {
      return undefined;
    }
  }

  public getInstagramUrl(value: string | undefined) {
    if (!value) return '';
    if (value.startsWith('@')) return value.replace('@', '');

    return value;
  }
}
