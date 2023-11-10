import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationRequestModel, UserListVm } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserInfoStore extends BaseCRUDStore<UserListVm> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.accountApi.getUserList({
      ...request,
      columns: '',
      pageSize: 50,
    });

  public override requestName = 'mixUserInfo';
  public override searchColumns = [];
  public override searchColumnsDict: { [key: string]: string } = {};
  public override vm$ = this.select((s) => s);

  public getUserById = (userId: string) => {
    return this.vm$.pipe(
      map((s) => {
        return s.data.find((user) => user.id === userId);
      })
    );
  };

  constructor() {
    super();

    this.request$$
      .pipe(
        tap(() => this.patchState((s) => ({ ...s, status: 'Loading' }))),
        tap((request) => this.loadData(request)),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
