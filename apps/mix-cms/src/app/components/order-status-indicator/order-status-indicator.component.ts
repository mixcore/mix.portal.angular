import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderStatus, OrderStatusDisplay } from '@mixcore/lib/model';

@Component({
  selector: 'mix-order-status-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status-indicator.component.html',
  styleUrls: ['./order-status-indicator.component.scss'],
})
export class OrderStatusIndicatorComponent {
  @Input() orderStatus!: OrderStatus;
  public StatusDisplay = OrderStatusDisplay;

  public styleDict: Record<OrderStatus, { background: string; color: string }> =
    {
      [OrderStatus.NEW]: {
        background: '#a4abb6',
        color: '',
      },
      [OrderStatus.WaitingPay]: {
        background: '#fbe83aff',
        color: '',
      },
      [OrderStatus.CANCELED]: {
        background: '#9c9c9c',
        color: '#fff',
      },
      [OrderStatus.PAID]: {
        background: '#2cccff',
        color: '#fff',
      },
      [OrderStatus.SHIPPING]: {
        background: '#2cccff',
        color: '#fff',
      },
      [OrderStatus.SUCCESS]: {
        background: '#57f000',
        color: '#fff',
      },
      [OrderStatus.PAYMENT_FAILED]: {
        background: '#ffb302',
        color: '#fff',
      },
      [OrderStatus.SHIPPING_FAILED]: {
        background: '#50431a',
        color: '#fff',
      },
      [OrderStatus.All]: {
        background: '',
        color: '',
      },
    };
}
