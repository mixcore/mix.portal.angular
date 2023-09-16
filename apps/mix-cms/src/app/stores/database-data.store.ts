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
import { catchError, filter, forkJoin, of } from 'rxjs';
import { BaseState } from './base-crud.store';

export interface DatabaseDataState extends BaseState<MixDynamicData> {
  dbSysName?: string;
  db?: MixDatabase;
  columns: MixColumn[];
  columnKeys: string[];
  loadDataError: boolean;
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
      loadDataError: false,
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
      this.mixApi.databaseApi
        .getDataByName<MixDynamicData>(dbName, request)
        .pipe(
          catchError(() => {
            return of({
              items: [],
              pagingData: {
                pageIndex: 0,
                pageSize: 30,
              },
              error: true,
            });
          })
        ),
      this.mixApi.databaseApi.getDatabaseBySystemName(dbName),
    ]).subscribe({
      next: ([result, db]) => {
        this.patchState((s) => ({
          ...s,
          status: 'Success',
          data: result.items,
          db: db,
          columns: db.columns,
          loadDataError: (result as any)['error'],
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
    this.patchState((s) => ({
      ...s,
      status: 'Loading',
      dbSysName: dbName,
      loadDataError: false,
    }));
    this.loadData(this.get().request, dbName);
  }

  public reloadOnlyData() {
    const state = this.get();
    if (!state.dbSysName) return;

    this.mixApi.databaseApi
      .getDataByName<MixDynamicData>(state.dbSysName, state.request)
      .subscribe((result) => {
        this.patchState((s) => ({
          ...s,
          data: result.items,
        }));
      });
  }

  public addData(data: MixDynamicData) {
    this.patchState((s) => ({
      ...s,
      data: [...s.data, data],
    }));
  }

  public removeData(dataId: number[]) {
    this.patchState((s) => ({
      ...s,
      data: s.data.filter((x) => !dataId.includes(x.id!)),
    }));
  }
}
