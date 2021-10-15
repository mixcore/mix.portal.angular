import { ValidatorFn } from '@angular/forms';

export function ifValidator(predicate: () => boolean, validator: ValidatorFn): ValidatorFn {
  return formControl => {
    if (!formControl.parent) {
      return null;
    }

    let error = null;
    if (predicate()) {
      error = validator(formControl);
    }

    return error;
  };
}
