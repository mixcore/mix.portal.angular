import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from '@mixcore/share/animation';

@Component({
  selector: 'mix-error-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
  animations: [
    bounceInOnEnterAnimation({ duration: 300 }),
    bounceOutOnLeaveAnimation({ duration: 300 }),
  ],
})
export class MixErrorAlertComponent {
  @Input() public error = '';
}
