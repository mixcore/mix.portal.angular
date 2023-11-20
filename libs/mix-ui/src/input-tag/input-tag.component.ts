import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputTagModule } from '@taiga-ui/kit';
import { BaseTextControl } from '../base';

@Component({
  selector: 'mix-input-tag',
  templateUrl: './input-tag.component.html',
  styleUrls: ['./input-tag.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiInputTagModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixInputTagComponent
  extends BaseTextControl<string[]>
  implements ControlValueAccessor
{
  override defaultValue = [];
  override defaultControl = new FormControl([]);

  @Input() override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() closable = true;
}
