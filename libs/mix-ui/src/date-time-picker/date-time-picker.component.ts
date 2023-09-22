import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl, DateUtils } from '@mixcore/ui/base-control';
import { AbstractTuiValueTransformer, TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TUI_DATE_TIME_VALUE_TRANSFORMER,
  TuiInputDateTimeModule,
  tuiInputDateOptionsProvider,
} from '@taiga-ui/kit';

@Injectable()
export class ExampleDateTimeTransformer extends AbstractTuiValueTransformer<
  [TuiDay | null, TuiTime | null],
  string | null
> {
  private readonly separator = `T`;

  fromControlValue(controlValue: any): [TuiDay | null, TuiTime | null] {
    if (!controlValue) return [null, null];

    let value: Date;
    if (controlValue instanceof Date) {
      value = controlValue;
    } else {
      controlValue = DateUtils.FormatDateString(controlValue);
      value = new Date(controlValue);
    }

    let tuiTime: TuiTime | null = TuiTime.fromLocalNativeDate(value);
    if (value.getHours() === 0 && value.getMinutes() === 0) {
      tuiTime = null;
    }

    return [TuiDay.fromLocalNativeDate(value), tuiTime];
  }

  toControlValue([day, time]: [TuiDay | null, TuiTime | null]): string | null {
    if (!day) return null;

    const output = day.toLocalNativeDate();
    if (time && TuiTime.isValidTime(time.hours, time.minutes)) {
      output.setHours(time.hours);
      output.setMinutes(time.minutes);
    }

    return output.toISOString() ?? null;
  }
}

@Component({
  selector: 'mix-date-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    tuiInputDateOptionsProvider({ nativePicker: true }),
    {
      provide: TUI_DATE_TIME_VALUE_TRANSFORMER,
      useClass: ExampleDateTimeTransformer,
    },
  ],
})
export class MixDateTimePickerComponent
  extends BaseTextControl<Date>
  implements ControlValueAccessor
{
  public override placeHolder = 'Choose a date';
  public override defaultValue: Date = new Date();
}
