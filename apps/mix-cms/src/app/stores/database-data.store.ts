import { Injectable, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MixDatabase, PaginationRequestModel } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ComponentStore } from '@ngrx/component-store';
import { forkJoin, tap } from 'rxjs';
import { BaseState } from './base-crud.store';

export interface DatabaseDataState extends BaseState<object> {
  dbSysName?: string;
  db?: MixDatabase;
}

@Injectable()
export class DatabaseDataStore extends ComponentStore<DatabaseDataState> {
  public mixApi = inject(MixApiFacadeService);
  public router = inject(Router);

  public status = this.selectSignal((s) => s.status);
  public dbSysName$ = this.selectSignal((s) => s.dbSysName);
  public request$ = this.selectSignal((s) => s.request);
  public data$ = this.selectSignal((s) => s.data);
  public db = this.selectSignal((s) => s.db);
  public pageInfo = this.selectSignal((s) => s.pageInfo);
  public dbColumn = this.selectSignal((s) =>
    s.db?.columns.sort((c) => c.priority).slice(0, 3)
  );

  constructor() {
    super({
      data: [],
      status: 'Pending',
      request: {
        pageIndex: 0,
        pageSize: 10,
      },
      pageInfo: {
        pageIndex: 0,
        pageSize: 10,
      },
    });

    effect(
      () => {
        const dbName = this.dbSysName$();
        if (!dbName) return;

        this.loadData(this.request$(), dbName);
      },
      { allowSignalWrites: true }
    );
  }

  public loadData(request: PaginationRequestModel, dbName: string) {
    forkJoin([
      this.mixApi.databaseApi.getDataByName(dbName, request),
      this.mixApi.databaseApi.getDatabaseBySystemName(dbName),
    ])
      .pipe(tap(() => this.patchState({ status: 'Loading' })))
      .subscribe({
        next: ([result, db]) => {
          this.patchState((s) => ({
            ...s,
            status: 'Success',
            data: result.items as object[],
            db: db,
            pageInfo: result.pagingData,
          }));
        },
      });
  }

  public changePage(index: number) {
    this.patchState((s) => ({
      ...s,
      request: {
        ...s.request,
        pageIndex: index,
      },
    }));
  }

  public changeDb(dbName: string) {
    this.patchState((s) => ({ ...s, dbSysName: dbName }));
  }
}
