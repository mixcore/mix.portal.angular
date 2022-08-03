import { CdkDragMove, DropListRef } from '@angular/cdk/drag-drop';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { TUI_ARROW, TuiArrowComponent } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  tap
} from 'rxjs';

import { Utils } from '../../utils';
import { TableColumnDirective } from './directives/column.directive';

@Component({
  selector: 'mix-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MixDataTableComponent<T> implements AfterContentInit, OnInit {
  public readonly emptyData: PaginationResultModel<T> = {
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 25,
      total: 0
    }
  };
  public currentSelectedItem: T[] = [];
  public cacheItems: T[] = [];
  public currentPage = 0;
  public isAllSelected = false;

  @Input() public selfControl = true;
  @Input() public fetchDataFn!: (
    filter: PaginationRequestModel
  ) => Observable<PaginationResultModel<T>>;
  @Input() public data$: BehaviorSubject<PaginationResultModel<T>> =
    new BehaviorSubject(this.emptyData);
  @Input() public loading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  @Input() public search = '';
  @Input() public searchPlaceholder = 'Search';
  @Input() public totalRows = 0;
  @Input() public searchable = true;
  @Input() public reOrderable = true;
  @Input() public dataIndexKey = 'id';
  @Input() public searchColumns = 'title';

  @Output() public pageChange: EventEmitter<number> = new EventEmitter();
  @Output() public pageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() public tableQueryChange: EventEmitter<PaginationRequestModel> =
    new EventEmitter();
  @Output() public itemsSelectedChange: EventEmitter<T[]> = new EventEmitter();

  @ViewChild('subDropList', { static: false }) public subDropList!: DropListRef;
  @ViewChild('dropList', { static: false }) public dropList!: DropListRef;

  @ContentChildren(TableColumnDirective)
  public columns!: QueryList<TableColumnDirective>;

  public tableInitialColumns: string[] = [];
  public tableColumns: string[] = [];
  public subTableColumns: string[] = [];
  public tableEnabledColumns: string[] = [];
  public tableSortFields: readonly string[] = [];
  public columnDic: Record<string, string> = {};
  public showSubTable = false;
  public firstLoad = true;

  public readonly showDragLeft: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly showDragRight: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly arrow: PolymorpheusComponent<TuiArrowComponent, object> =
    TUI_ARROW;
  public readonly searchText$: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  public readonly size$: Subject<number> = new Subject();
  public readonly page$: Subject<number> = new Subject();
  public readonly dragChange: Subject<number> = new Subject();
  public readonly direction$: BehaviorSubject<1 | -1> = new BehaviorSubject<
    -1 | 1
  >(1);
  public readonly reload$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public request$: Observable<[string, 1 | -1, number, number, boolean]> =
    combineLatest([
      this.searchText$.pipe(debounceTime(300)),
      this.direction$,
      this.page$.pipe(startWith(0)),
      this.size$.pipe(startWith(10)),
      this.reload$
    ]);

  constructor(private elementRef: ElementRef) {}

  public ngOnInit(): void {
    if (this.selfControl) {
      this._setupSelfControl();
    } else {
      this.request$.subscribe(
        (query: [string, 1 | -1, number, number, boolean]) => {
          this.tableQueryChange.emit({
            keyword: query[0],
            pageIndex: query[3],
            pageSize: query[2]
          });
        }
      );
    }
  }

  public handleDragAndDrop(): void {
    // this.dragChange.pipe(debounceTime(100)).subscribe((pointerX: number) => {
    //   const currentListOffsetLeft = this.elementRef.nativeElement.offsetLeft;
    //   const currentListOffsetRight = this.elementRef.nativeElement.offsetWidth + currentListOffsetLeft;
    //   if (pointerX - currentListOffsetLeft <= 100) {
    //     this.showDragRight.next(false);
    //     this.showDragLeft.next(true);
    //   } else if (currentListOffsetRight - pointerX <= 100) {
    //     this.showDragRight.next(true);
    //     this.showDragLeft.next(false);
    //   } else {
    //     this.showDragRight.next(false);
    //     this.showDragLeft.next(false);
    //   }
    // });
    // this.showDragLeft.pipe(debounceTime(500)).subscribe(v => {
    //   if (!v) return;
    //   this.showSubTable = true;
    // });
    // this.showDragRight.pipe(debounceTime(500)).subscribe(v => {
    //   if (!v) return;
    //   this.showSubTable = true;
    // });
  }

  public isItemSelected(item: T): boolean {
    return !!this.currentSelectedItem.find(
      (v: T) => JSON.stringify(v) === JSON.stringify(item)
    );
  }

  public ngAfterContentInit(): void {
    const columns: TableColumnDirective[] = this.columns.toArray();
    this.columnDic = this._buildColumnDictionary(columns);
    this.tableInitialColumns = columns.map((c: TableColumnDirective) => c.key);
    this.tableColumns = columns.map((c: TableColumnDirective) => c.key);
    this.subTableColumns = columns
      .filter(c => c.columnType !== 'CHECKBOX' && c.showInSubTable === true)
      .map((c: TableColumnDirective) => c.key);
    this.tableSortFields = columns.map((c: TableColumnDirective) => c.header);
  }

  public onEnabled(enabled: readonly string[]) {
    this.tableColumns = this.tableSortFields
      .filter((key: string) => enabled.includes(key))
      .map((v: string) => this.columnDic[v]);
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
      this.currentSelectedItem = this.currentSelectedItem.filter(
        (v: T) => JSON.stringify(item) !== JSON.stringify(v)
      );
    }

    this.isAllSelected =
      this.currentSelectedItem.length === this.cacheItems.length;
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

  public onDragItem(event: CdkDragMove): void {
    this.dragChange.next(event.pointerPosition.x);
  }

  public onReleaseDragItem(): void {
    //
  }

  private _processSelfFetchData(
    searchText: string,
    page: number,
    pageSize: number
  ): Observable<PaginationResultModel<T>> {
    return this.fetchDataFn({
      keyword: searchText,
      pageIndex: page,
      pageSize: pageSize,
      searchColumns: this.searchColumns,
      searchMethod: 'Like'
    });
  }

  private _showLoading(): void {
    this.loading$.next(true);
  }

  private _hideLoading(): void {
    this.loading$.next(false);
  }

  private _buildColumnDictionary(
    columns: TableColumnDirective[]
  ): Record<string, string> {
    return columns.reduce(
      (acc: object, item: TableColumnDirective) => ({
        ...acc,
        [item.header]: item.key
      }),
      {}
    );
  }

  private _setupSelfControl(): void {
    this.request$
      .pipe(
        tap(() => this._showLoading()),
        switchMap((query: [string, 1 | -1, number, number, boolean]) =>
          this._processSelfFetchData(query[0], query[2], query[3])
        ),
        tap((res: PaginationResultModel<T>) => {
          this._hideLoading();
          this.cacheItems = res.items;
          this.currentPage = res.pagingData.pageIndex;
        }),
        startWith(this.emptyData),
        catchError(() => {
          this._hideLoading();
          return of(this.emptyData);
        })
      )
      .subscribe(result => {
        if (Utils.isDifferent(result, this.emptyData)) this.firstLoad = false;
        this.data$.next(result);
      });
  }
}
