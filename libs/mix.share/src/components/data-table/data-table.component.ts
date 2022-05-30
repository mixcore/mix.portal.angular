import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { PaginationRequestModel, PaginationResultModel } from '@mix-spa/mix.lib';
import { TUI_ARROW, TuiArrowComponent } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, catchError, combineLatest, debounceTime, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';

import { TableColumnDirective } from './directives/column.directive';

@Component({
  selector: 'mix-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MixDataTableComponent<T> implements AfterContentInit, OnInit {
  public currentSelectedItem: T[] = [];
  public cacheItems: T[] = [];
  public isAllSelected = false;

  // Required fetchDataFn to enable self control
  @Input() public selfControl = true;
  @Input() public fetchDataFn!: (filter: PaginationRequestModel) => Observable<PaginationResultModel<T>>;

  @Input() public data$!: Observable<PaginationResultModel<T>>;
  @Input() public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Input() public search = '';
  @Input() public searchPlaceholder = 'Search';
  @Input() public totalRows = 0;
  @Input() public searchable = true;
  @Input() public reOrderable = true;
  @Input() public dataIndexKey = 'id';

  @Output() public pageChange: EventEmitter<number> = new EventEmitter();
  @Output() public pageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() public tableQueryChange: EventEmitter<PaginationRequestModel> = new EventEmitter();
  @Output() public itemsSelectedChange: EventEmitter<T[]> = new EventEmitter();

  @ContentChildren(TableColumnDirective)
  public columns!: QueryList<TableColumnDirective>;

  public tableInitialColumns: string[] = [];
  public tableColumns: string[] = [];
  public tableEnabledColumns: string[] = [];
  public tableSortFields: readonly string[] = [];

  public columnDic: Record<string, string> = {};

  public readonly arrow: PolymorpheusComponent<TuiArrowComponent, object> = TUI_ARROW;
  public readonly searchText$: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly size$: Subject<number> = new Subject();
  public readonly page$: Subject<number> = new Subject();
  public readonly direction$: BehaviorSubject<1 | -1> = new BehaviorSubject<-1 | 1>(1);
  public readonly reload$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly emptyData: PaginationResultModel<T> = {
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 25,
      totalItems: 0
    }
  };

  public request$: Observable<[string, 1 | -1, number, number, boolean]> = combineLatest([
    this.searchText$.pipe(debounceTime(300)),
    this.direction$,
    this.page$.pipe(startWith(0)),
    this.size$.pipe(startWith(10)),
    this.reload$
  ]);

  public ngOnInit(): void {
    if (this.selfControl) {
      this._setupSelfControl();
    } else {
      this.request$.subscribe((query: [string, 1 | -1, number, number, boolean]) => {
        this.tableQueryChange.emit({
          keyword: query[0],
          pageIndex: query[3],
          pageSize: query[2]
        });
      });
    }
  }

  public isItemSelected(item: T): boolean {
    return !!this.currentSelectedItem.find((v: T) => JSON.stringify(v) === JSON.stringify(item));
  }

  public ngAfterContentInit(): void {
    const columns: TableColumnDirective[] = this.columns.toArray();
    this.columnDic = this._buildColumnDictionary(columns);
    this.tableInitialColumns = columns.map((c: TableColumnDirective) => c.key);
    this.tableColumns = this.tableInitialColumns;
    this.tableSortFields = columns.map((c: TableColumnDirective) => c.header);
  }

  public onEnabled(enabled: readonly string[]) {
    this.tableColumns = this.tableSortFields.filter((key: string) => enabled.includes(key)).map((v: string) => this.columnDic[v]);
  }

  public onPageChange(page: number): void {
    this.pageChange.emit(page);
    this.page$.next(page);
  }

  public onSizeChange(size: number): void {
    this.pageSizeChange.emit(size);
    this.size$.next(size);
  }

  public onItemSelected(value: boolean, item: T): void {
    if (value) {
      this.currentSelectedItem.push(item);
    } else {
      this.currentSelectedItem = this.currentSelectedItem.filter((v: T) => JSON.stringify(item) !== JSON.stringify(v));
    }

    this.isAllSelected = this.currentSelectedItem.length === this.cacheItems.length;
    this.itemsSelectedChange.emit(this.currentSelectedItem);
  }

  public markAllChecked(value: boolean): void {
    if (value) {
      this.currentSelectedItem = this.cacheItems;
    } else {
      this.currentSelectedItem = [];
    }

    this.isAllSelected = value;
    this.itemsSelectedChange.emit(this.currentSelectedItem);
  }

  public getNavigationLength(totalCount: number, pageSize: number): number {
    return Math.floor(totalCount / pageSize) || 1;
  }

  public reloadData(): void {
    this.reload$.next(!this.reload$.getValue());
  }

  private _processSelfFetchData(searchText: string, page: number, pageSize: number): Observable<PaginationResultModel<T>> {
    return this.fetchDataFn({
      keyword: searchText,
      pageIndex: page,
      pageSize: pageSize
    });
  }

  private _showLoading(): void {
    this.loading$.next(true);
  }

  private _hideLoading(): void {
    this.loading$.next(false);
  }

  private _buildColumnDictionary(columns: TableColumnDirective[]): Record<string, string> {
    return columns.reduce((acc: object, item: TableColumnDirective) => ({ ...acc, [item.header]: item.key }), {});
  }

  private _setupSelfControl(): void {
    this.data$ = this.request$.pipe(
      tap(() => this._showLoading()),
      switchMap((query: [string, 1 | -1, number, number, boolean]) => this._processSelfFetchData(query[0], query[2], query[3])),
      tap((res: PaginationResultModel<T>) => {
        this._hideLoading();
        this.cacheItems = res.items;
      }),
      startWith(this.emptyData),
      catchError(() => {
        this._hideLoading();
        return of(this.emptyData);
      })
    );
  }
}
