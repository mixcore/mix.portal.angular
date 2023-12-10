import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  DbContextFixId,
  MixDatabase,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { ObjectUtil } from '@mixcore/share/form';
import { combineLatest, switchMap, tap } from 'rxjs';
import { DbUiStore } from './db-ui.store';

@Injectable({ providedIn: 'root' })
export class MasterDbStore extends BaseCRUDStore<MixDatabase> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.gets(request);

  public override requestName = 'mixDatabase';
  public override searchColumns = ['Name', 'Description'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'nitle',
    Description: 'description',
  };
  public override buildCacheKey(request: PaginationRequestModel): string {
    return `${this.requestName}-${ObjectUtil.objectToQueryString(request)}`;
  }

  public uiStore = inject(DbUiStore);

  public stateSignal = toSignal(
    combineLatest([this.request$$, this.uiStore.selectedContextId$]).pipe(
      tap(([request, projectId]) => {
        request['mixDatabaseContextId'] =
          projectId === DbContextFixId.MasterDb ? undefined : projectId;

        this.loadData(request);
      }),
      switchMap(() => this.select((s) => s))
    )
  );
}
