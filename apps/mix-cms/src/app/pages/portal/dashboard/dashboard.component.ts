import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderStatus, PaymentGateway } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { AuthService } from '@mixcore/share/auth';
import { BaseComponent } from '@mixcore/share/base';
import { CountUpDirective } from '@mixcore/share/pipe';
import { map, startWith } from 'rxjs';
import { GatewayIndicatorComponent } from '../../../components/gateway-indicator/gateway-indicator.component';

@Component({
  selector: 'mix-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, CountUpDirective, GatewayIndicatorComponent],
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent {
  public mixApi = inject(MixApiFacadeService);
  public authService = inject(AuthService);
  public userName$ = this.authService.user$.pipe(map((x) => x?.userName));
  public Paypal = PaymentGateway.Paypal;
  public OnePay = PaymentGateway.OnePay;

  public showChart = false;
  public weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  public helloPrefix = 'Hi';
  public currentDay = this.weekday[new Date().getDay()];
  public currentDate = new Date().toLocaleDateString();
  // --bs-success: #198754;
  // --bs-info: #0dcaf0;
  // --bs-warning: #ffc107;
  // --bs-danger: #dc3545;
  // --bs-light: #f8f9fa;
  // --bs-dark: #212529;

  public colorMap = {
    success: 'var(--bs-teal)',
    error: 'var(--bs-danger)',
    paid: 'var(--bs-info)',
    shipping: 'var(--bs-warning)',
    wait: '#f1f7b5',
    gateway: '#90f1ef',
  };

  public success$ = this.mixApi.eCommerce
    .countStatus(OrderStatus.SUCCESS)
    .pipe(startWith(0));

  public paid$ = this.mixApi.eCommerce
    .countStatus(OrderStatus.PAID)
    .pipe(startWith(0));

  public waitToPay$ = this.mixApi.eCommerce
    .countStatus(OrderStatus.WaitingPay)
    .pipe(startWith(0));

  public shipping$ = this.mixApi.eCommerce
    .countStatus(OrderStatus.SHIPPING)
    .pipe(startWith(0));

  public canceled$ = this.mixApi.eCommerce
    .countStatus(OrderStatus.CANCELED)
    .pipe(startWith(0));

  public onePay$ = this.mixApi.eCommerce
    .countGateWay(PaymentGateway.OnePay)
    .pipe(startWith(0));

  public paypal$ = this.mixApi.eCommerce
    .countGateWay(PaymentGateway.Paypal)
    .pipe(startWith(0));
}
