import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { PortalSidebarService } from '@mixcore/ui/sidebar';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { Apollo } from 'apollo-angular';
import { CMS_ROUTES } from '../../../app.routes';
import { DatabaseDetailComponent } from '../../../components/database-detail/database-detail.component';
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
    DatabaseDetailComponent,
  ],
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent {
  public apollo = inject(Apollo);
  public store = inject(DatabaseStore);
  public router = inject(Router);
  public selectedPages: MixDatabase[] = [];
  public contextMenus: TableContextMenu<MixDatabase>[] = [
    {
      label: 'Modify database',
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
}
