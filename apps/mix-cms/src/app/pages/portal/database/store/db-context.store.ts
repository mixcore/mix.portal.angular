import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MixDbContext, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseContextStore extends BaseCRUDStore<MixDbContext> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseContext.gets({ ...request, columns: '', pageSize: 50 });

  public override vm$ = this.select((s) => s);
  public override requestName = 'databaseContext';
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
        tap(() => this.patchState({ status: 'Loading' })),
        tap((request) => this.loadData(request)),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
