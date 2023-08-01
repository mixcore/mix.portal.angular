import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MixContentStatus,
  MixDatabase,
  MixDynamicData,
  MixOrderBy,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { DomHelper, toastObserverProcessing } from '@mixcore/share/helper';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { ModalService } from '@mixcore/ui/modal';
import { MixDataTableModule } from '@mixcore/ui/table';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { forkJoin, takeUntil, tap } from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { ActionCollapseComponent } from '../../../components/action-collapse/action-collapse.component';
import { BasicMixFilterComponent } from '../../../components/basic-mix-filter/basic-mix-filter.component';
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
  ],
  templateUrl: './database-data.component.html',
  styleUrls: ['./database-data.component.scss'],
  providers: [DatabaseDataStore, TuiDestroyService],
  encapsulation: ViewEncapsulation.None,
})
export class DatabaseDataComponent
  extends ListPageKit<MixDynamicData>
  implements OnInit
{
  @ViewChild(DynamicDbListComponent) dataList!: DynamicDbListComponent;

  public dbSysName = signal('');
  public dbDisplayName = signal('Database');
  public mixApi = inject(MixApiFacadeService);
  public activatedRoute = inject(ActivatedRoute);
  public modal = inject(ModalService);
  public filterValue = signal<PaginationRequestModel>({
    status: MixContentStatus.Published,
    orderBy: MixOrderBy.CreatedDateTime,
    direction: 'Desc',
  });
  public viewInit = true;
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

  public onloadSuccess = (db: MixDatabase) => {
    this.dbDisplayName.set(db.displayName);
  };

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.dbSysName.set(v['databaseSysName']);
      setTimeout(() => (this.viewInit = false));
      setTimeout(() => (this.viewInit = true));
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
          this.mixApi.databaseApi.deleteData(this.dbSysName(), d.id!)
        );

        forkJoin(requests).subscribe({
          next: () => {
            this.dataList.onReload();
            this.modal.success('Successfully delete your data').subscribe();
          },
        });
      });
  }

  public onFilterChange(value: PaginationRequestModel) {
    this.filterValue.set(value);
  }

  public onExportData() {
    this.mixApi.databaseApi
      .exportDataByDbName(this.dbSysName(), {
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
      `${CMS_ROUTES.portal['database-data'].fullPath}/${this.dbSysName()}/${
        data.id
      }`
    );
  }

  async onCreateData() {
    await this.router.navigateByUrl(
      `${
        CMS_ROUTES.portal['database-data'].fullPath
      }/${this.dbSysName()}/create`
    );
  }
}
