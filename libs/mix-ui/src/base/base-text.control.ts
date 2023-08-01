import { Directive, Inject, Input, Optional, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
@Directive()
export class BaseTextControl<T = string> {
  @Input() public placeHolder = '';
  public defaultValue: T = <T>'';
  public defaultControl = new FormControl(this.defaultValue);

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    public readonly ngControl: NgControl | null
  ) {
    if (this.ngControl && !this.ngControl.valueAccessor) {
      this.ngControl.valueAccessor = this;
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

  public get control(): FormControl {
    return (this.ngControl?.control as FormControl) ?? this.defaultControl;
  }
}
