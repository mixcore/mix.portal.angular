import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DataTypeToAgCellEditor,
  MixDatabase,
  MixDynamicData,
  MixFilter,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import {
  BasicMixFilterComponent,
  MixStatusIndicatorComponent,
  MixSubToolbarComponent,
  RecordFormComponent,
} from '@mixcore/share/components';
import {
  DomHelper,
  extractBaseSegment,
  toastObserverProcessing,
} from '@mixcore/share/helper';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DynamicFilterComponent } from '@mixcore/ui/filter';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { MixDataTableModule } from '@mixcore/ui/table';
import { DialogService } from '@ngneat/dialog';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiReorderModule, TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiCheckboxModule, TuiPaginationModule } from '@taiga-ui/kit';
import { AgGridModule } from 'ag-grid-angular';
import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ListPageKit } from '../../../kit/list-page-kit.component';
import { CustomActionCellComponent } from '../components/custom-action-cell/custom-action-cell.component';
import { CustomHeaderComponent } from '../components/custom-header/custom-header.component';
import { DatabaseInlineSelectComponent } from '../components/database-inline-select/database-inline-select.component';
import { DatabaseVerticalToolbarComponent } from '../components/vertical-toolbar/database-vertical-toolbar.component';
import { DatabaseDataStore } from '../store/database-data.store';

@Component({
  selector: 'mix-database-data',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    BasicMixFilterComponent,
    TuiTableModule,
    TuiCheckboxModule,
    FormsModule,
    MixInputComponent,
    TuiPaginationModule,
    SkeletonLoadingComponent,
    AgGridModule,
    CustomHeaderComponent,
    TuiReorderModule,
    TippyDirective,
    ReactiveFormsModule,
    DynamicFilterComponent,
    DatabaseVerticalToolbarComponent,
    DatabaseInlineSelectComponent,
  ],
  templateUrl: './database-data.component.html',
  styleUrls: ['./database-data.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseDataComponent
  extends ListPageKit<MixDynamicData>
  implements OnInit
{
  public mixApi = inject(MixApiFacadeService);
  public activatedRoute = inject(ActivatedRoute);
  public modal = inject(ModalService);
  public store = inject(DatabaseDataStore);
  public dialog = inject(DialogService);
  public activeRoute = inject(ActivatedRoute);

  public dbSysName = '';
  public activeCol = '';
  public isAllCheck = false;
  public searchForm = new FormControl();

  public components: Record<string, any> = {
    agColumnHeader: CustomHeaderComponent,
  };
  public rowData$!: Observable<MixDynamicData[]>;
  public readonly checkableColumnDef: ColDef = {
    rowDrag: true,
    resizable: false,
    width: 80,
    colId: 'uid',
    field: 'priority',
    pinned: 'left',
    lockPinned: true,
    sortable: false,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    editable: true,
    headerComponentParams: {
      displayName: '',
      columnType: 'check',
    },
  };
  public readonly actionColumnDef: ColDef = {
    resizable: false,
    width: 80,
    colId: 'action',
    field: 'action',
    sortable: false,
    pinned: 'right',
    headerComponentParams: {
      displayName: '#',
      columnType: 'action',
    },
    cellRenderer: CustomActionCellComponent,
  };
  public readonly defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    editable: true,
    width: 250,
  };

  public currentPath = 'query';
  public get currentRouteSegments() {
    return this.activeRoute.snapshot.pathFromRoot
      .map((segment) => segment.url.map((urlSegment) => urlSegment.path))
      .reduce((acc, segments) => acc.concat(segments), []);
  }

  public context: any;
  public allColumnDefs: ColDef[] = [];
  public columnDefs: ColDef[] = [];
  public columnNames: string[] = [];
  public displayColumns: string[] = [];
  public displayColumns$ = new Subject<string[]>();
  public gridApi!: GridApi<MixDynamicData>;
  public data = signal<MixDynamicData[]>([]);

  public onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.store.vm$
      .pipe(
        filter((s) => !!s.db),
        takeUntil(this.destroy$)
      )
      .subscribe((s) => {
        if (s.db) {
          this.allColumnDefs = s.db.columns.map(
            (x) =>
              <ColDef>{
                colId: x.systemName,
                field: x.systemName,
                headerComponentParams: {
                  displayName: x.displayName,
                  dataType: x.dataType,
                  columnType: 'value',
                },
                cellEditor: DataTypeToAgCellEditor(x.dataType),
              }
          );
          this.columnNames = s.db.columns.map((x) => x.displayName);
          this.displayColumns = this.columnNames;

          this.columnDefs = [
            this.checkableColumnDef,
            ...this.allColumnDefs,
            this.actionColumnDef,
          ];

          this.data.set(s.data);
        }
      });

    this.displayColumns$
      .pipe(distinctUntilChanged(), debounceTime(0), takeUntil(this.destroy$))
      .subscribe((v) => this.reUpdateColumnDef());

    this.searchForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((v) => {
        this.store.changeSearch(v);
      });
  }

  public cellValueChanged(event: CellValueChangedEvent) {
    const data = event.data as MixDynamicData;
    Object.keys(data).forEach((key) => {
      if (data[key] === null) {
        delete data[key];
      }
    });

    this.mixApi.databaseApi
      .saveData(this.dbSysName, data.id ?? -1, data)
      .pipe(toastObserverProcessing(this.toast))
      .subscribe((result) => {
        this.store.updateAtIndex(event.rowIndex || 0, result as MixDynamicData);
      });
  }

  public onSelectionChanged() {
    this.selectedItems = this.gridApi.getSelectedRows();
  }

  constructor() {
    super({
      contextMenu: [],
      searchOptions: [],
      detailUrl: '',
    });

    this.context = {
      componentParent: this,
    };
  }

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.dbSysName = v['databaseSysName'];

      if (this.dbSysName) {
        this.store.changeDb(this.dbSysName);
      }
    });
  }

  public onSetupDb(isCreate = false) {
    const baseSegment = extractBaseSegment(
      this.currentPath,
      this.activatedRoute
    );

    if (isCreate) {
      this.router.navigate([...baseSegment, 'create']);
      return;
    }

    this.store.vm$
      .pipe(take(1))
      .subscribe((vm) =>
        this.router.navigate([...baseSegment, vm.db?.id ?? 'create'])
      );
  }

  public onDeleteData(): void {
    const selectedData = this.selectedItems;
    if (!selectedData?.length) {
      this.toast.warning('Please choose data to delete');
      return;
    }

    this.modal
      .warning('Do you want to delete these data(s) ?')
      .subscribe((ok) => {
        if (!ok) return;
        const requests = selectedData.map((d) =>
          this.mixApi.databaseApi.deleteData(this.dbSysName, d.id!)
        );

        forkJoin(requests)
          .pipe(toastObserverProcessing(this.toast))
          .subscribe({
            next: () => {
              this.store.removeData(selectedData.map((x) => x.id!));
              this.selectedItems = [];
              this.gridApi.deselectAll();
            },
          });
      });
  }

  public onExportData() {
    this.mixApi.databaseApi
      .exportDataByDbName(this.dbSysName, {
        pageSize: 1000,
        pageIndex: 0,
      })
      .pipe(
        tap((r) => DomHelper.downloadFile(r.filename, r.fullPath)),
        toastObserverProcessing(this.toast)
      )
      .subscribe();
  }

  public onHideColumn(displayName: string) {
    this.displayColumns = this.displayColumns.filter((d) => d !== displayName);
    this.reUpdateColumnDef();
  }

  public selectedTableChange(mixDb: MixDatabase) {
    if (mixDb.systemName == this.dbSysName) return;
    this.searchForm.reset(null, { emitEvent: false, onlySelf: true });

    const baseSegment = extractBaseSegment(
      this.currentPath,
      this.activatedRoute
    );
    this.router.navigate([...baseSegment, this.currentPath, mixDb.systemName]);
  }

  public reUpdateColumnDef() {
    const columnDefs = this.displayColumns.map(
      (v) =>
        this.allColumnDefs.find(
          (x) => x.headerComponentParams.displayName === v
        )!
    );

    this.columnDefs = [
      this.checkableColumnDef,
      ...columnDefs,
      this.actionColumnDef,
    ];
  }

  public onPreviewData(db: MixDatabase): void {
    const baseSegment = extractBaseSegment(
      this.currentPath,
      this.activatedRoute
    );

    this.router.navigate([...baseSegment, 'open-api', db.id], {
      state: { db: db },
    });
  }

  public onInsertData(): void {
    this.store.state$.pipe(take(1)).subscribe((value) => {
      if (!value.db) return;

      const dialogRef = this.dialog.open(RecordFormComponent, {
        data: { mixDatabase: value.db, data: undefined },
        windowClass: RecordFormComponent.windowClass,
        minWidth: RecordFormComponent.minWidth,
        maxWidth: RecordFormComponent.maxWidth,
        dragConstraint: 'bounce',
        draggable: true,
        enableClose: {
          escape: true,
          backdrop: false,
        },
      });

      dialogRef.afterClosed$.subscribe((value) => {
        if (value) this.store.addData(value);
      });
    });
  }

  public onFilterChange(value: MixFilter[]) {
    this.store.changeFilters(value);
  }

  public editData(dataId: number) {
    this.store.state$.pipe(take(1)).subscribe((state) => {
      if (!state.db) return;

      const dataIndex = state.data.findIndex((x) => x.id === dataId);
      if (dataIndex < 0) return;

      const dialogRef = this.dialog.open(RecordFormComponent, {
        data: { mixDatabase: state.db, data: state.data[dataIndex] },
        windowClass: RecordFormComponent.windowClass,
        minWidth: RecordFormComponent.minWidth,
        maxWidth: RecordFormComponent.maxWidth,
        draggable: true,
        enableClose: {
          escape: true,
          backdrop: false,
        },
      });

      dialogRef.afterClosed$.subscribe((value) => {
        if (value) this.store.updateData(dataIndex, value);
      });
    });
  }

  public rowHeightChange(value: number) {
    this.gridApi.forEachNode((node) => {
      node.setRowHeight(40 * value);
    });

    this.gridApi.onRowHeightChanged();
  }
}
