import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TuiBlockStatusModule } from '@taiga-ui/layout';

@Component({
  selector: 'mix-empty-content',
  standalone: true,
  imports: [CommonModule, TuiBlockStatusModule, MixButtonComponent],
  templateUrl: './empty-content.component.html',
  styleUrl: './empty-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MixEmptyContentComponent {
  @Input() title: string = 'No data found';
  @Input() description: string = 'Create your own wonderful data';
  @Output() actionClick = new EventEmitter();
}
