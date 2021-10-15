import { FormGroup } from '@angular/forms';

export class FormUtils {
  public static validateForm(form: FormGroup): boolean {
    for (const i in form.controls) {
      form.controls[i].markAsDirty();
      form.controls[i].updateValueAndValidity();
    }

    return form.valid;
  }
}
