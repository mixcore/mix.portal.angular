import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationRequestModel, UserListVm } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseState, DEFAULT_DATA } from '@mixcore/share/base';
import { ComponentStore } from '@ngrx/component-store';
import { filter, map, switchMap, tap } from 'rxjs';

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

  public loadData(request: PaginationRequestModel) {
    return this.requestFn(request).pipe(
      tap((result) => {
        this.patchState((s) => ({
          ...s,
          data: result.items,
          pageInfo: result.pagingData,
          status: 'Success',
        }));
      })
    );
  }

  public reload() {
    this.requestFn(this.get().request).subscribe();
  }

  constructor() {
    super({
      status: 'Loading',
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
        switchMap((request) => this.loadData(request)),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
