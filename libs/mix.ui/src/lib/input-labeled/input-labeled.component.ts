import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TuiLabelModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mix-input-labeled',
  templateUrl: './input-labeled.component.html',
  styleUrls: ['./input-labeled.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiLabelModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiTextAreaModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputLabeledComponent,
      multi: true
    }
  ]
})
export class InputLabeledComponent implements ControlValueAccessor {
  @Input() public type: 'text' | 'text-area' = 'text';
  @Input() public label = '';
  public value = '';
  public value$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.value
  );

  public onChange = (value: string) => value;
  public onTouch = () => undefined;

  public writeValue(value: string): void {
    this.value = value;
    this.value$.next(value);
  }

  public registerOnChange(fn: (value: string) => string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => undefined): void {
    this.onTouch = fn;
  }

  public onValueChange(value: string): void {
    this.value = value;
    this.value$.next(value);
    this.onChange(value);
    this.onTouch();
  }
}
