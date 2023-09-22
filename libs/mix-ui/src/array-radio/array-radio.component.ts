import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MixInputComponent } from '@mixcore/ui/input';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-array-radio',
  standalone: true,
  imports: [
    CommonModule,
    TuiRadioLabeledModule,
    ReactiveFormsModule,
    TuiLinkModule,
    MixInputComponent,
    FormsModule,
  ],
  templateUrl: './array-radio.component.html',
  styleUrls: ['./array-radio.component.scss'],
  providers: [
    TuiDestroyService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MixArrayRadioComponent,
      multi: true,
    },
  ],
})
export class MixArrayRadioComponent implements ControlValueAccessor {
  destroy$ = inject(TuiDestroyService);

  items: string[] = [];
  form = new FormGroup({ choose: new FormControl() });
  value: { [key: string]: boolean } = {};
  onAddNew = false;

  newValue = new FormControl();

  onChange = (value: { [key: string]: boolean }) => value;
  onTouch = () => undefined;

  writeValue(obj: { [key: string]: boolean }): void {
    const value = obj ?? {};
    this.value = value;
    this.items = Object.keys(value);
    this.form.patchValue({
      choose: this.items.find((i) => this.value[i]) || '',
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.calculateValue();
    });
  }

  registerOnChange(
    fn: (value: { [key: string]: boolean }) => { [key: string]: boolean }
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => undefined): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    //
  }

  onAddNewClicked() {
    const newValue = this.newValue.value;
    if (!newValue) return;

    if (this.items.includes(newValue)) {
      this.newValue.reset();
      return;
    }

    this.items.push(newValue);
    this.newValue.reset();
    this.calculateValue();
  }

  calculateValue() {
    this.items.forEach((item) => {
      this.value[item] = this.form.value.choose === item;
    });

    this.onChange(this.value);
  }

  onRemove(item: string) {
    this.items = this.items.filter((x) => x !== item);
    delete this.value[item];

    this.onChange(this.value);
  }
}
