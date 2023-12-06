import { Observable, of, switchMap, tap } from 'rxjs';

export function tapOnce<T>(tapFunction: (value: T) => void) {
  let tapExecuted = false;

  return (source: Observable<T>) =>
    source.pipe(
      tap((value) => {
        if (!tapExecuted) {
          tapFunction(value);
          tapExecuted = true;
        }
      }),
      switchMap((value) => {
        return of(value);
      })
    );
}
