import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mix-formly-control-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formly-control-layout.component.html',
  styleUrls: ['./formly-control-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyControlLayoutComponent {
  @Input() title?: string = '';
  @Input() description?: string = '';
}
