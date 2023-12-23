import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaymentGateway } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { AuthService } from '@mixcore/share/auth';
import { BaseComponent } from '@mixcore/share/base';
import { CountUpDirective } from '@mixcore/share/pipe';
import { map } from 'rxjs';
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
}
