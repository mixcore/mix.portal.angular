import { InjectionToken } from '@angular/core';

export type ErrorMap = Record<string, (value: object) => string>;

export const ERROR_MAP = new InjectionToken<ErrorMap>('error map');

export const errorMap: ErrorMap = {
  required: () => 'This field is required',
};
