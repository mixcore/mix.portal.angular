import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { debounceTime, startWith, takeUntil } from 'rxjs';
import { TableColumnDirective } from './directives/column.directive';

export interface TableContextMenu<T> {
  label: string;
  icon: string;
  action: (item: T) => void;
}

@Component({
  selector: 'mix-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TuiDestroyService],
})
export class DataTableComponent<T> implements AfterContentInit {
  @ContentChildren(TableColumnDirective)
  public columns!: QueryList<TableColumnDirective>;

  @ViewChild('mainTable') mainTable!: ElementRef<HTMLElement>;

  public cdr = inject(ChangeDetectorRef);
  public destroy$ = inject(TuiDestroyService);

  @Output() public dragDropChange: EventEmitter<{ item: T; toItem: T }> =
    new EventEmitter();
  @Output() public pageChange: EventEmitter<number> = new EventEmitter();
  @Output() public searchChange: EventEmitter<{
    searchText: string;
    searchField: string;
  }> = new EventEmitter();

  @Input() public searchPlaceholder = 'Type to find';
  @Input() public selectedItem: T | undefined = undefined;
  @Input() public enableDnd = false;
  @Input() public searchTextValue = '';
  @Input() public searchText: FormControl = new FormControl();
  @Input() public searchField: FormControl = new FormControl();
  @Input() public set searchFieldOptions(v: string[]) {
    this._searchFieldOptions = v;
    if (!this.searchField.value) this.searchField.patchValue(v[0]);
  }
  public get searchFieldOptions() {
    return this._searchFieldOptions;
  }
  @Input() public contextMenus: TableContextMenu<T>[] = [];
  @Input() public set dataset(v: T[]) {
    this._dataset = v;
    this.markAllUnchecked();

    if (this.mainTable?.nativeElement) {
      setTimeout(() => {
        this.mainTable.nativeElement.scrollTop = 0;
      }, 100);
    }
  }
  public get dataset() {
    return this._dataset;
  }

  @Input() public loading = false;
  @Input() public forceLoading = false;
  @Input() public uniqueKey = 'id';
  @Input() public pageInfo: {
    pageIndex: number;
    page?: number;
    pageSize: number;
    total?: number;
    totalPage?: number;
  } = {
    pageIndex: 0,
    page: 0,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  };

  public tableSortFieldsInitial: readonly string[] = [];
  public tableSortFieldsSorted: readonly string[] = [];
  public tableInitialColumns: string[] = [];
  public tableColumns: string[] = [];
  public columnDic: Record<string, string> = {};
  public isAllSelected = false;
  public currentSelectedItem: T[] = [];
  public currentSelectedItemDic: Record<string, T | undefined> = {};
  public displayDataSet = signal<T[]>([]);

  private _dataset: T[] = [];
  private _searchFieldOptions: string[] = [];

  @Output() public itemsSelectedChange: EventEmitter<T[]> = new EventEmitter();

  public ngAfterContentInit(): void {
    this.searchText.patchValue(this.searchTextValue, { emitEvent: false });
    this.displayDataSet.set(this.dataset);
    this.columns.changes
      .pipe(startWith([]), takeUntil(this.destroy$))
      .subscribe((v) => {
        const columns: TableColumnDirective[] = this.columns.toArray();
        this.columnDic = this._buildColumnDictionary(columns);
        this.tableInitialColumns = columns.map(
          (c: TableColumnDirective) => c.key
        );
        this.tableColumns = this.tableInitialColumns;
        this.tableSortFieldsInitial = columns.map(
          (c: TableColumnDirective) => c.header
        );
        this.tableSortFieldsSorted = this.tableSortFieldsInitial;
      });

    this.searchText.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((v) => {
        this.searchChange.next({
          searchText: v,
          searchField: this.searchField.getRawValue(),
        });
      });
  }

  public onPageChange(index: number): void {
    this.pageChange.emit(index);
  }

  public onItemSelected(value: boolean, item: T): void {
    if (value) {
      this.currentSelectedItemDic[(item as any)[this.uniqueKey]] = item;
    } else {
      this.currentSelectedItemDic[(item as any)[this.uniqueKey]] = undefined;
    }

    if (value) {
      this.currentSelectedItem.push(item);
    } else {
      this.currentSelectedItem = this.currentSelectedItem.filter(
        (v: T) => (v as any)[this.uniqueKey] != (item as any)[this.uniqueKey]
      );
    }

    this.isAllSelected =
      Object.keys(this.currentSelectedItemDic).length === this.dataset.length;

    this.itemsSelectedChange.emit(this.currentSelectedItem);
  }

  public markAllChecked(value: boolean): void {
    this.currentSelectedItemDic = {};

    if (value) {
      this.currentSelectedItem = this.dataset;
    } else {
      this.currentSelectedItem = [];
    }

    this.currentSelectedItem.forEach((item) => {
      this.currentSelectedItemDic[(item as any)[this.uniqueKey]] = item;
    });

    this.isAllSelected = value;
    this.itemsSelectedChange.emit(this.currentSelectedItem);
  }

  public markAllUnchecked() {
    this.currentSelectedItem = [];
    this.currentSelectedItemDic = {};
    this.itemsSelectedChange.emit(this.currentSelectedItem);
    this.isAllSelected = false;
  }

  private _buildColumnDictionary(
    columns: TableColumnDirective[]
  ): Record<string, string> {
    return columns.reduce(
      (acc: object, item: TableColumnDirective) => ({
        ...acc,
        [item.header]: item.key,
      }),
      {}
    );
  }

  public drop(event: CdkDragDrop<any>) {
    const itemToMove = this.dataset[event.previousIndex];
    const moveTo = this.dataset[event.currentIndex];

    this.dragDropChange.emit({ item: itemToMove, toItem: moveTo });

    moveItemInArray(this.dataset, event.previousIndex, event.currentIndex);
  }

  public dataTrackBy(index: number, data: T) {
    return (data as any)[this.uniqueKey];
  }
}