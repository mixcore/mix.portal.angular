import { Injectable, inject } from '@angular/core';

import { Router } from '@angular/router';
import {
  MixContentStatus,
  MixFilter,
  PaginationModel,
  PaginationRequestModel,
  PaginationResultModel,
  SearchMethod,
  buildCacheKey,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { CacheService } from '../services/index';

export interface BaseState<T> {
  data: T[];
  request: PaginationRequestModel;
  pageInfo: PaginationModel;
  status: 'Loading' | 'Error' | 'Pending' | 'Success' | 'SilentLoading';
}

export const DEFAULT_DATA = {
  items: [],
  pagingData: {
    pageIndex: 0,
    pageSize: 30,
  },
};

export function SuccessFilter<T>(value: BaseState<T>): value is BaseState<T> {
  return value.status === 'Success';
}

@Injectable()
export class BaseCRUDStore<T> extends ComponentStore<BaseState<T>> {
  public mixApi = inject(MixApiFacadeService);
  public router = inject(Router);
  public cacheService = inject(CacheService);

  public requestName = '';
  public status$ = this.selectSignal((s) => s.status);
  public request$ = this.selectSignal((s) => s.request);
  public data$ = this.selectSignal((s) => s.data);

  public request$$ = this.select((s) => s.request);
  public vm$ = this.request$$.pipe(
    tap((r) => this.loadData(r)),
    switchMap(() => this.select((s) => s))
  );

  public cachePool$ = new BehaviorSubject<PaginationResultModel<T>>(
    DEFAULT_DATA
  );
  public columns = '';

  public cacheKey = '';
  public isSilentlyLoading = false;
  public requestObserver!: Subscription;
  public searchColumns: string[] = [];
  public searchColumnsDict: { [key: string]: string } = {};

  public requestFn!: (
    request: PaginationRequestModel
  ) => Observable<PaginationResultModel<T>>;

  public loadData = this.effect(
    (request$: Observable<PaginationRequestModel>) =>
      request$.pipe(
        switchMap((request) => {
          this.cacheKey = buildCacheKey(request, this.requestName);
          if (!this.cacheService.has(this.cacheKey)) {
            this.patchState({ status: 'Loading' });
          }

          return of(request);
        }),
        switchMap((request) => this.silentFetchData(request)),
        tapResponse(
          (result) => {
            this.cacheService.delete(this.cacheKey);
            this.cacheService.set(this.cacheKey, result);

            this.patchState({
              data: result.items,
              pageInfo: result.pagingData,
            });
          },
          () => this.patchState({ status: 'Error' })
        )
      )
  );

  public reUpdateCache() {
    this.cacheService.delete(this.cacheKey);
    this.cacheService.set(this.cacheKey, this.get());
  }

  public reload() {
    this.patchState({ status: 'Loading' });
    this.loadData(this.request$());
  }

  public silentFetchData(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<T>> {
    if (this.cacheService.has(this.cacheKey)) {
      const cachedResponse = this.cacheService.get(this.cacheKey);
      this.cachePool$.next(cachedResponse);
    }

    if (this.requestFn) {
      if (this.requestObserver) {
        this.requestObserver.unsubscribe();
      }

      this.requestObserver = this.requestFn(request).subscribe((result) => {
        this.patchState({ status: 'Success' });
        this.cachePool$.next(result);
      });
    }

    return this.cachePool$.asObservable();
  }

  public changePage(index: number) {
    const request = this.get().request;
    request.pageIndex = index;

    this.patchState({ request: request });
  }

  public searchChange(
    searchText: string,
    searchColumns: string,
    method: SearchMethod = 'Like'
  ) {
    this.patchState((s) => ({
      ...s,
      request: {
        ...s.request,
        keyword: searchText,
        searchColumns: searchColumns,
        pageIndex: 0,
        searchMethod: method,
      },
    }));
  }

  public metadataChange(key: string, metadata: MixFilter[]) {
    const request = this.request$();
    if (!metadata) return;

    request.metadataQueries = request.metadataQueries?.filter(
      (e) => e.fieldName !== key
    );
    request.metadataQueries = request.metadataQueries?.concat(metadata);

    this.patchState((s) => ({
      ...s,
      request: {
        ...request,
        pageIndex: 0,
      },
    }));
  }

  public filterChange(filter: Record<string, string>) {
    this.patchState((s) => ({
      ...s,
      request: {
        ...s.request,
        ...filter,
        pageIndex: 0,
      },
    }));
  }

  public queryChange(queries: MixFilter[]) {
    this.patchState((s) => ({
      ...s,
      request: {
        ...s.request,
        queries: queries,
        pageIndex: 0,
      },
    }));
  }

  public search(searchText: string, searchColumns: string[]) {
    const trueSearchCols = searchColumns.map((f) => this.searchColumnsDict[f]);
    const searchColText = trueSearchCols.join(', ');

    this.patchState((s) => ({
      ...s,
      request: {
        ...s.request,
        keyword: searchText,
        searchColumns: searchColText,
        pageIndex: 0,
        searchMethod: 'Like',
      },
    }));
  }

  constructor() {
    super({
      status: 'Pending',
      request: {
        pageIndex: 0,
        pageSize: 30,
        direction: 'Desc',
        status: MixContentStatus.Published,
        searchMethod: 'Like',
        columns: '',
        orderBy: 'createdDateTime',
        metadataQueries: [],
      },
      data: DEFAULT_DATA.items,
      pageInfo: DEFAULT_DATA.pagingData,
    });
  }
}
