import { CommonModule } from '@angular/common';
import { Component, Inject, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
} from '../animations';
import { ERROR_MAP, ErrorMap } from './error-map';

@Component({
  selector: 'mix-form-error',
  template:
    '<div style="color: var(--form-error); padding: 0 var(--form-error-padding)" [@bounceInOnEnter] [@bounceOutOnLeave] *ngIf="computedError"> {{ computedError }}</div>',
  styles: [],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    bounceInOnEnterAnimation({ duration: 300 }),
    bounceOutOnLeaveAnimation({ duration: 300 }),
  ],
})
export class MixFormErrorComponent implements ControlValueAccessor {
  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    private readonly ngControl: NgControl | null,
    @Inject(ERROR_MAP) public errorMap: ErrorMap
  ) {
    if (ngControl && !ngControl.valueAccessor) {
      ngControl.valueAccessor = this;
    }
  }

  registerOnChange(): void {
    //
  }

  registerOnTouched(): void {
    //
  }

  setDisabledState(): void {
    //
  }

  writeValue(): void {
    //
  }

  get computedError(): string | null {
    return this.invalid && this.touched ? this.error : null;
  }

  private get error(): string | null {
    if (!this.control?.errors) return null;

    const error = Object.keys(this.control?.errors)[0];
    const errorValue = this.control?.errors[error];

    return this.errorMap[error]
      ? this.errorMap[error](errorValue)
      : 'Invalid field';
  }

  public get control(): AbstractControl | null {
    return this.ngControl?.control || null;
  }

  public get invalid(): boolean {
    return !!this.control?.invalid;
  }

  public get touched(): boolean {
    return !!this.control?.touched;
  }
}
