import { AbstractControl, FormGroup } from '@angular/forms';

export class FormUtils {
  public static validateForm(form: FormGroup): boolean {
    Object.values(form.controls).forEach((control: AbstractControl) => {
      if (control.invalid) {
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });

    return form.valid;
  }
}
