import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export class FormUtils {
  public static validateForm(form: FormGroup): boolean {
    if (!form.controls) {
      return form.valid;
    }

    Object.values(form.controls).forEach((control: AbstractControl) => {
      if (control.invalid) {
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity({ onlySelf: true });
      }

      if (control instanceof FormArray)
        control.controls.some(
          (form: AbstractControl) => !FormUtils.validateForm(form as FormGroup)
        );
    });

    return form.valid;
  }
}
