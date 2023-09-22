import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'mix-icon-button',
  standalone: true,
  imports: [CommonModule, TuiButtonModule],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixIconButtonComponent {
  @Input() name = '';
  @Input() size: 'l' | 'm' | 'xs' = 'xs';
  @Input() loading = false;
  @Input() disabled = false;
}
