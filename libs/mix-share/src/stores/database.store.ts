import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MixDatabase, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseStore extends BaseCRUDStore<MixDatabase> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.gets({ ...request, columns: '', pageSize: 100 });

  public override vm$ = this.select((s) => s);

  public override requestName = 'database';
  public override searchColumns = ['Name', 'Description'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'displayName',
    Description: 'description',
    Status: 'status',
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
