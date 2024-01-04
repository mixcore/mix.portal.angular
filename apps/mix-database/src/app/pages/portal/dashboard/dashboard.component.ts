import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaymentGateway } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { AuthService } from '@mixcore/share/auth';
import { BasePageComponent } from '@mixcore/share/base';
import { CountUpDirective } from '@mixcore/share/pipe';
import { MixBreadcrumbsModule } from '@mixcore/ui/breadcrumbs';
import { map } from 'rxjs';

@Component({
  selector: 'mix-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, CountUpDirective, MixBreadcrumbsModule],
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BasePageComponent {
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

  public colorMap = {
    success: '#5cb85c',
    error: '#5cb85c',
    paid: '#5cb85c',
    shipping: '#5cb85c',
    wait: '#f1f7b5',
    gateway: '#90f1ef',
  };
}
