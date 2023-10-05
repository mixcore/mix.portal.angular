import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationRequestModel, UserListVm } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ComponentStore } from '@ngrx/component-store';
import { filter, map, switchMap, tap } from 'rxjs';
import { BaseState, DEFAULT_DATA } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class UserInfoStore extends ComponentStore<BaseState<UserListVm>> {
  public mixApi = inject(MixApiFacadeService);
  public vm$ = this.select((s) => s);
  public request$ = this.select((s) => s.request);

  public requestFn = (request: PaginationRequestModel) =>
    this.mixApi.accountApi.getUserList({ ...request, loadNestedData: true });

  public getUserById = (userId: string) => {
    return this.vm$.pipe(
      filter((s) => s.status === 'Success'),
      map((s) => {
        return s.data.find((user) => user.id === userId);
      })
    );
  };

  constructor() {
    super({
      status: 'Pending',
      request: {
        pageIndex: 0,
        pageSize: 50,
        direction: 'Desc',
        searchMethod: 'Like',
        columns: '',
        orderBy: 'createdDateTime',
        metadataQueries: [],
      },
      data: DEFAULT_DATA.items,
      pageInfo: DEFAULT_DATA.pagingData,
    });

    this.request$
      .pipe(
        tap(() => this.patchState((s) => ({ ...s, status: 'Loading' }))),
        switchMap((request) => this.requestFn(request)),
        tap((result) => {
          this.patchState((s) => ({
            ...s,
            data: result.items,
            pageInfo: result.pagingData,
            status: 'Success',
          }));
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
