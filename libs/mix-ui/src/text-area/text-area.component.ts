import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiTextAreaModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-text-area',
  standalone: true,
  imports: [
    CommonModule,
    TuiTextAreaModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class MixTextAreaComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @Input() override placeHolder = 'Type a text';
}
