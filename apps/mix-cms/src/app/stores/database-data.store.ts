import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MixColumn,
  MixDatabase,
  MixDynamicData,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ComponentStore } from '@ngrx/component-store';
import { filter, forkJoin, tap } from 'rxjs';
import { BaseState } from './base-crud.store';

export interface DatabaseDataState extends BaseState<MixDynamicData> {
  dbSysName?: string;
  db?: MixDatabase;
  columns: MixColumn[];
  columnKeys: string[];
}

@Injectable()
export class DatabaseDataStore extends ComponentStore<DatabaseDataState> {
  public mixApi = inject(MixApiFacadeService);
  public router = inject(Router);

  public dbSysName$ = this.select((s) => s.dbSysName).pipe(filter(Boolean));
  public query$ = this.select((s) => s.request);
  public vm$ = this.select((s) => s);

  constructor() {
    super({
      columnKeys: [],
      columns: [],
      data: [],
      status: 'Pending',
      request: {
        pageIndex: 0,
        pageSize: 25,
      },
      pageInfo: {
        pageIndex: 0,
        pageSize: 25,
      },
    });
  }

  public loadData(request: PaginationRequestModel, dbName: string) {
    forkJoin([
      this.mixApi.databaseApi.getDataByName<MixDynamicData>(dbName, request),
      this.mixApi.databaseApi.getDatabaseBySystemName(dbName),
    ])
      .pipe(tap(() => this.patchState({ status: 'Loading' })))
      .subscribe({
        next: ([result, db]) => {
          this.patchState((s) => ({
            ...s,
            status: 'Success',
            data: result.items,
            db: db,
            columns: db.columns,
            columnKeys: [
              'checkbox',
              ...db.columns.map((x) => x.systemName),
              'add-col',
            ],
            pageInfo: result.pagingData,
          }));
        },
      });
  }

  public changePage(index: number) {
    this.patchState((s) => ({
      ...s,
      status: 'Loading',
      request: {
        ...s.request,
        pageIndex: index,
      },
    }));

    this.loadData(this.get().request, this.get().dbSysName!);
  }

  public changeDb(dbName: string) {
    this.patchState((s) => ({ ...s, status: 'Loading', dbSysName: dbName }));
    this.loadData(this.get().request, dbName);
  }
}
