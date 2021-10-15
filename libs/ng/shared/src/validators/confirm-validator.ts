import { ValidatorFn } from '@angular/forms';

export function confirmValidator(predicate: () => string | undefined): ValidatorFn {
  return formControl => {
    if (!formControl.parent) {
      return null;
    }

    if (!formControl.value) {
      return { required: true };
    }

    let error = null;
    if (formControl.value !== predicate()) {
      error = { confirm: true, error: true };
    }

    return error;
  };
}
