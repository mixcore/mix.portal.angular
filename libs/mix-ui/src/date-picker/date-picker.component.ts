import { CommonModule } from '@angular/common';
import { Component, Directive, Injectable } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { AbstractTuiValueTransformer, TuiDay } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TUI_DATE_VALUE_TRANSFORMER,
  TuiInputDateModule,
  TuiInputDateTimeModule,
} from '@taiga-ui/kit';
import { BaseTextControl } from '../base/base-text.control';

type From = TuiDay | null;
type To = Date | null;

@Injectable()
class DateTransformer extends AbstractTuiValueTransformer<From, To> {
  fromControlValue(controlValue: To): From {
    return controlValue && TuiDay.fromUtcNativeDate(controlValue);
  }

  toControlValue(componentValue: From): To {
    return componentValue?.toUtcNativeDate() || null;
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'tui-input-date[toNativeDate]',
  providers: [
    {
      provide: TUI_DATE_VALUE_TRANSFORMER,
      useClass: DateTransformer,
    },
  ],
  standalone: true,
})
export class NativeDateTransformerDirective {}

@Component({
  selector: 'mix-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputDateModule,
    TuiInputDateTimeModule,
    TuiTextfieldControllerModule,
    NativeDateTransformerDirective,
  ],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class MixDatePickerComponent
  extends BaseTextControl<Date>
  implements ControlValueAccessor
{
  public override placeHolder = 'Choose a date';
  public override defaultValue: Date = new Date();
}
