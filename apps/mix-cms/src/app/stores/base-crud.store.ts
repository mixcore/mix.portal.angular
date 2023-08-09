import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd } from '@angular/router';

import { Router } from '@angular/router';
import {
  MetadataQuery,
  MixContentStatus,
  PaginationModel,
  PaginationRequestModel,
  PaginationResultModel,
  SearchMethod,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { CacheService } from '../shares/services/cached.service';
export interface BaseState<T> {
  data: T[];
  request: PaginationRequestModel;
  pageInfo: PaginationModel;
  status: 'Loading' | 'Error' | 'Pending' | 'Success';
}

@Injectable()
export class BaseCRUDStore<T> extends ComponentStore<BaseState<T>> {
  public mixApi = inject(MixApiFacadeService);
  public router = inject(Router);
  public cacheService = inject(CacheService);

  public requestName = '';
  public mainUrl = '';
  public routeChange$ = toSignal(
    this.router.events.pipe(
      filter(
        (event) => event instanceof NavigationEnd && event.url === this.mainUrl
      )
    )
  );

  public status$ = this.selectSignal((s) => s.status);
  public request$ = this.selectSignal((s) => s.request);
  public data$ = this.selectSignal((s) => s.data);

  public request$$ = this.select((s) => s.request);
  public vm$ = this.request$$.pipe(
    tap((r) => this.loadData(r)),
    switchMap((s) => this.select((s) => s))
  );

  public columns = '';
  public cacheSubject$ = new BehaviorSubject<PaginationResultModel<T>>({
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 30,
    },
  });

  public cacheKey = '';
  public isSilentlyLoading = false;
  public requestObserver!: Subscription;

  public requestFn!: (
    request: PaginationRequestModel
  ) => Observable<PaginationResultModel<T>>;

  public buildCacheKey(request: PaginationRequestModel): string {
    return `${this.requestName}-${request.pageIndex}-${request.pageSize}-${request.status}-${request.direction}-${request.keyword}-${request.orderBy}`;
  }

  constructor() {
    super({
      data: [],
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
      pageInfo: {
        pageIndex: 0,
        pageSize: 30,
      },
    });

    // effect(() => this.loadData(this.request$()), { allowSignalWrites: true });
  }

  public loadData = this.effect(
    (request$: Observable<PaginationRequestModel>) =>
      request$.pipe(
        tap(() => {
          this.patchState({ status: 'Loading' });
        }),
        switchMap((request) => this.silentFetchData(request)),
        tapResponse(
          (result) => {
            this.cacheService.delete(this.cacheKey);
            this.cacheService.set(this.cacheKey, result);

            this.patchState({
              data: result.items,
              pageInfo: result.pagingData,
              status: 'Success',
            });
          },
          () => this.patchState({ status: 'Error' })
        )
      )
  );

  public reload() {
    this.loadData(this.request$());
  }

  public silentFetchData(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<T>> {
    // if (this.cacheService.has(this.cacheKey)) {
    //   const cachedResponse = this.cacheService.get(this.cacheKey);
    //   this.cacheSubject$.next(cachedResponse);
    // }
    return this.requestFn(request);

    // if (this.requestFn) {
    //   if (this.requestObserver) {
    //     this.requestObserver.unsubscribe();
    //   }

    //   this.requestObserver = this.requestFn(request).subscribe((result) => {
    //     this.patchState({ status: 'Success' });
    //     this.cacheSubject$.next(result);
    //   });
    // }

    // return this.cacheSubject$.asObservable();
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

  public metadataChange(key: string, metadata: MetadataQuery[]) {
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

  public queryChange(queries: MetadataQuery[]) {
    this.patchState((s) => ({
      ...s,
      request: {
        ...s.request,
        queries: queries,
        pageIndex: 0,
      },
    }));
  }
}
