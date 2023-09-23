import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DynamicFilterComponent } from '@mixcore/ui/filter';
import { ModalService } from '@mixcore/ui/modal';
import { PortalSidebarService } from '@mixcore/ui/sidebar';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { forkJoin } from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { DatabaseStore } from '../../../stores/database.store';

@Component({
  selector: 'mix-database',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    DynamicFilterComponent,
  ],
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent {
  public store = inject(DatabaseStore);
  public router = inject(Router);
  public modal = inject(ModalService);
  public mixApi = inject(MixApiFacadeService);
  public toast = inject(HotToastService);

  public selectedTable: MixDatabase[] = [];
  public contextMenus: TableContextMenu<MixDatabase>[] = [
    {
      label: 'Setting Db',
      icon: 'construction',
      action: (item) => {
        this.goDetail(item.id);
      },
    },
    {
      label: `Setting Db's Columns`,
      icon: 'construction',
      action: (item) => {
        this.goDetail(item.id);
      },
    },
    {
      label: 'View table data',
      icon: 'database',
      action: (item) => {
        this.goDatabaseData(item.systemName);
      },
    },
  ];

  constructor(
    @Inject(PortalSidebarService)
    private readonly sidebar: PortalSidebarService
  ) {}

  async goDetail(id: number) {
    this.router.navigateByUrl(`${CMS_ROUTES.portal.database.fullPath}/${id}`);
  }

  async goDatabaseData(sysName: string) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${sysName}`
    );
  }

  async createDatabase() {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal.database.fullPath}/create`
    );
  }

  public onDeleteTable() {
    if (!this.selectedTable.length) return;

    this.modal.asKForAction(
      'Are you sure to delete selected table(s) ?',
      () => {
        const requests = this.selectedTable
          .map((tb) => tb.id)
          .map((id) => this.mixApi.databaseApi.deleteById(id));

        forkJoin(requests)
          .pipe(toastObserverProcessing(this.toast))
          .subscribe(() => {
            this.store.reload();
            this.selectedTable = [];
          });
      }
    );
  }
}
