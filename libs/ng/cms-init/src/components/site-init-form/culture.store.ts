import { IBaseState, IErrorMessage } from '@coreng/angular-core';
import { mergeMap, tap } from 'rxjs/operators';

import { ComponentStore } from '@ngrx/component-store';
import { Culture } from '@mix-portal/ng/shared';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedApiService } from '@mix-portal/ng/cms-api';

export interface ICultureState extends IBaseState<Culture[]> {}

@Injectable()
export class CultureStore extends ComponentStore<ICultureState> {
  public readonly culturesState$: Observable<ICultureState> = this.select((s: ICultureState) => s);

  public readonly loadCulture: () => void = this.effect((param$: Observable<void>) => {
    return param$.pipe(
      tap(() => {
        this.patchState({
          status: 'Loading',
          errors: []
        });
      }),
      mergeMap(() =>
        this.sharedApi.getCultures().pipe(
          tap({
            next: (cultures: Culture[]) => this.patchState({ data: cultures, status: 'Success', errors: [] }),
            error: (errors: IErrorMessage[]) => this.patchState({ status: 'Error', errors })
          })
        )
      )
    );
  });

  constructor(private sharedApi: SharedApiService) {
    super({
      data: [],
      errors: [],
      status: 'Pending'
    });

    this.loadCulture();
  }
}
