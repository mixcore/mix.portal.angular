import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mix-inline-edit-placeholder',
  templateUrl: './inline-edit-placeholder.component.html',
  styleUrls: ['./inline-edit-placeholder.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiAutoFocusModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InlineEditPlaceholderComponent,
      multi: true
    }
  ]
})
export class InlineEditPlaceholderComponent implements ControlValueAccessor {
  @Input() public editing = false;
  public value = '';
  public value$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.value
  );

  public onChange = (value: string) => value;
  public onTouch = () => undefined;

  public enableEdit(): void {
    this.editing = true;
  }

  public onFocusedChange(isFocus: boolean): void {
    if (!isFocus) this.editing = false;
  }

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
