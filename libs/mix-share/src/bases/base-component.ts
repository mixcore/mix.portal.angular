import { Directive, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, defer, tap } from 'rxjs';

export const enum LoadingState {
  Error = 'Error',
  Loading = 'Loading',
  Success = 'Success',
  Pending = 'Pending',
}

@Directive()
export abstract class BaseComponent {
  public destroy$: Subject<boolean> = new Subject();
  public loadingState$ = new BehaviorSubject(LoadingState.Pending);
  public loadingState = signal(LoadingState.Pending);
  public error = '';

  public observerLoadingState<T>(): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => {
      return defer(() => {
        this.loadingState$.next(LoadingState.Loading);
        return source.pipe(
          tap({
            finalize: () => this.loadingState$.next(LoadingState.Success),
            next: () => this.loadingState$.next(LoadingState.Success),
            error: () => this.loadingState$.next(LoadingState.Error),
          })
        );
      });
    };
  }

  public observerLoadingStateSignal<T>(
    silentLoad = false
  ): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => {
      return defer(() => {
        if (!silentLoad) this.loadingState.set(LoadingState.Loading);
        return source.pipe(
          tap({
            finalize: () => this.loadingState.set(LoadingState.Success),
            next: () => this.loadingState.set(LoadingState.Success),
            error: () => this.loadingState.set(LoadingState.Error),
          })
        );
      });
    };
  }

  public clearError(): void {
    this.error = '';
  }

  public setState(state: LoadingState) {
    this.loadingState$.next(state);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
