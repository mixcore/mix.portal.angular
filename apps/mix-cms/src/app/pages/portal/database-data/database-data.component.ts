import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MixDatabase, MixDynamicData } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { DomHelper, toastObserverProcessing } from '@mixcore/share/helper';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
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
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { ActionCollapseComponent } from '../../../components/action-collapse/action-collapse.component';
import { BasicMixFilterComponent } from '../../../components/basic-mix-filter/basic-mix-filter.component';
import { DatabaseSelectComponent } from '../../../components/database-select/database-select.component';
import { RecordFormComponent } from '../../../components/record-form/record-form.component';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { ListPageKit } from '../../../shares/kits/list-page-kit.component';
import { DatabaseDataStore } from '../../../stores/database-data.store';
import { CustomActionCellComponent } from './components/custom-action-cell/custom-action-cell.component';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
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
    ActionCollapseComponent,
    TuiTableModule,
    TuiCheckboxModule,
    FormsModule,
    MixInputComponent,
    TuiPaginationModule,
    DatabaseSelectComponent,
    SkeletonLoadingComponent,
    AgGridModule,
    CustomHeaderComponent,
    TuiReorderModule,
    TippyDirective,
  ],
  templateUrl: './database-data.component.html',
  styleUrls: ['./database-data.component.scss'],
  providers: [TuiDestroyService, DatabaseDataStore],
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

  public dbSysName = '';
  public activeCol = '';
  public isAllCheck = false;

  public components: {
    [p: string]: any;
  } = {
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
    width: 250,
  };

  public context: any;
  public allColumnDefs: ColDef[] = [];
  public columnDefs: ColDef[] = [];
  public columnNames: string[] = [];
  public displayColumns: string[] = [];
  public displayColumns$ = new Subject<string[]>();

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.store.vm$.pipe(
      filter((s) => s.status === 'Success'),
      tap((s) => {
        if (s.db) {
          this.allColumnDefs = s.db.columns.map(
            (x, i) =>
              <ColDef>{
                colId: x.systemName,
                field: x.systemName,
                headerComponentParams: {
                  displayName: x.displayName,
                  dataType: x.dataType,
                  columnType: 'value',
                },
              }
          );
          this.columnNames = s.db.columns.map((x) => x.displayName);
          this.displayColumns = this.columnNames;

          this.columnDefs = [
            this.checkableColumnDef,
            ...this.allColumnDefs,
            this.actionColumnDef,
          ];
        }
      }),
      map((s) => s.data)
    );

    this.displayColumns$
      .pipe(distinctUntilChanged(), debounceTime(0))
      .subscribe((v) => this.reUpdateColumnDef());
  }

  public actions = [
    {
      label: 'Insert',
      key: 'create',
      icon: 'add',
      place: 'left',
      type: 'primary',
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: 'delete',
      place: 'left',
      type: 'danger',
    },
    {
      label: 'Export',
      key: 'export',
      icon: 'system_update_alt',
      place: 'left',
    },
  ];

  public actionMaps = {
    create: () => this.onInsertData(),
    delete: () => this.onDeleteData(),
    export: () => this.onExportData(),
  };

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

        forkJoin(requests).subscribe({
          next: () => {
            this.modal.success('Successfully delete your data').subscribe();
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

  public async onEditData(data: MixDynamicData) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${this.dbSysName}/${data.id}`
    );
  }

  public async onCreateData() {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${this.dbSysName}/create`
    );
  }

  public onHideColumn(displayName: string) {
    this.displayColumns = this.displayColumns.filter((d) => d !== displayName);
    this.reUpdateColumnDef();
  }

  public selectedTableChange(mixDb: MixDatabase) {
    if (mixDb.systemName == this.dbSysName) return;

    this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${mixDb.systemName}`
    );
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
    this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-doc'].fullPath}/${db.id}`,
      { state: { db: db } }
    );
  }

  public onInsertData(): void {
    this.store.state$.pipe(take(1)).subscribe((value) => {
      if (!value.db) return;

      const dialogRef = this.dialog.open(RecordFormComponent, {
        data: { mixDatabase: value.db },
      });

      dialogRef.afterClosed$.subscribe((value) => {
        if (value) this.store.addData(value);
      });
    });
  }
}
