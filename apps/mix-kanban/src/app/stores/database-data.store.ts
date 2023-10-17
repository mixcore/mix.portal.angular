import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MixColumn,
  MixDatabase,
  MixDynamicData,
  PaginationRequestModel,
  STRING_DATA_TYPE,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseState } from '@mixcore/share/base';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, filter, forkJoin, of } from 'rxjs';

export interface DatabaseDataState extends BaseState<MixDynamicData> {
  dbSysName?: string;
  db?: MixDatabase;
  columns: MixColumn[];
  columnKeys: string[];
  searchColumnKeys: string;
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
      searchColumnKeys: '',
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

  public loadData(
    request: PaginationRequestModel,
    dbName: string,
    forceReloadDb = false
  ) {
    const state = this.get();
    const getDbReq =
      state.dbSysName !== dbName || !state.db || forceReloadDb
        ? this.mixApi.databaseApi.getDatabaseBySystemName(dbName)
        : of(state.db);

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
      getDbReq,
    ]).subscribe({
      next: ([result, db]) => {
        this.patchState((s) => ({
          ...s,
          status: 'Success',
          data: result.items,
          db: db,
          columns: db.columns,
          searchColumnKeys: db.columns
            .filter((x) => STRING_DATA_TYPE.includes(x.dataType))
            .map((x) => x.systemName)
            .join(', '),
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
    const state = this.get();
    if (!state.dbSysName) return;

    this.patchState((s) => ({
      ...s,
      status: 'Loading',
      request: {
        ...s.request,
        pageIndex: index,
      },
    }));

    this.loadData(state.request, state.dbSysName!);
  }

  public changeDb(dbName: string) {
    this.patchState((s) => ({
      ...s,
      status: 'Loading',
      dbSysName: dbName,
      db: undefined,
      loadDataError: false,
      request: {
        pageIndex: 0,
        pageSize: 25,
      },
    }));
    this.loadData(this.get().request, dbName, true);
  }

  public changeSearch(searchText: string) {
    const state = this.get();
    if (!state.dbSysName) return;

    const request = {
      ...state.request,
      keyword: searchText,
      searchColumns: state.searchColumnKeys,
      searchMethod: 'Like',
    } as PaginationRequestModel;

    this.patchState((s) => ({
      ...s,
      status: 'Loading',
      loadDataError: false,
      request: request,
    }));

    this.loadData(request, state.dbSysName);
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

  public updateData(dataIndex: number, data: MixDynamicData) {
    this.patchState((s) => {
      const current = s.data;
      current[dataIndex] = data;

      return {
        ...s,
        data: current,
      };
    });
  }

  public removeData(dataId: number[]) {
    this.patchState((s) => ({
      ...s,
      data: s.data.filter((x) => !dataId.includes(x.id!)),
    }));
  }
}
