import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputColorModule,
  defaultEditorColors,
} from '@taiga-ui/addon-editor';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { BaseTextControl } from '../base/base-text.control';

@Component({
  selector: 'mix-color-picker',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiInputColorModule,
  ],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class MixColorPickerComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @Input() type = 'text';
  @Input() override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() floatingLabel = false;
  @Input() searchIcon = false;

  readonly palette = defaultEditorColors;
}
