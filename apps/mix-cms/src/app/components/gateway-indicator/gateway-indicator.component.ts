import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaymentGateway } from '@mixcore/lib/model';

@Component({
  selector: 'mix-gateway-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gateway-indicator.component.html',
  styleUrls: ['./gateway-indicator.component.scss'],
})
export class GatewayIndicatorComponent {
  @Input() public gateway!: PaymentGateway;
  public GATEWAY = PaymentGateway;
}
