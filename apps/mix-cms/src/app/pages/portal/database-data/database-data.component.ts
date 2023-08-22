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
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiCheckboxModule, TuiPaginationModule } from '@taiga-ui/kit';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, filter, forkJoin, map, takeUntil, tap } from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { ActionCollapseComponent } from '../../../components/action-collapse/action-collapse.component';
import { BasicMixFilterComponent } from '../../../components/basic-mix-filter/basic-mix-filter.component';
import { DatabaseSelectComponent } from '../../../components/database-select/database-select.component';
import { DynamicDbListComponent } from '../../../components/dynamic-db-list/dynamic-db-list.component';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { ListPageKit } from '../../../shares/kits/list-page-kit.component';
import { DatabaseDataStore } from '../../../stores/database-data.store';

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
    DynamicDbListComponent,
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
  public dbSysName = '';
  public mixApi = inject(MixApiFacadeService);
  public activatedRoute = inject(ActivatedRoute);
  public modal = inject(ModalService);
  public store = inject(DatabaseDataStore);
  public activeCol = '';
  public isAllCheck = false;

  public rowData$!: Observable<MixDynamicData[]>;
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
  };

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.store.vm$.pipe(
      filter((s) => s.status === 'Success'),

      tap((s) => {
        if (s.db)
          this.columnDefs = s.db?.columns.map(
            (x) => <ColDef>{ colId: x.systemName, field: x.displayName }
          );
      }),
      map((s) => s.data)
    );
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
      type: 'secondary-danger',
    },
    {
      label: 'Export',
      key: 'export',
      icon: 'system_update_alt',
      place: 'left',
    },
  ];
  public actionMaps = {
    create: () => this.onCreateData(),
    delete: () => this.onDeleteData(),
    export: () => this.onExportData(),
  };

  constructor() {
    super({
      contextMenu: [],
      searchOptions: [],
      detailUrl: '',
    });
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

  async onEditData(data: MixDynamicData) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${this.dbSysName}/${data.id}`
    );
  }

  async onCreateData() {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${this.dbSysName}/create`
    );
  }

  public selectedTableChange(mixDb: MixDatabase) {
    if (mixDb.systemName == this.dbSysName) return;

    this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${mixDb.systemName}`
    );
  }
}
