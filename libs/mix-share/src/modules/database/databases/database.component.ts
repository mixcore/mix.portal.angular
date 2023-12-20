import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbContextFixId, MixDatabase } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import {
  MixStatusIndicatorComponent,
  MixSubToolbarComponent,
} from '@mixcore/share/components';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { DatabaseStore } from '@mixcore/share/stores';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DynamicFilterComponent } from '@mixcore/ui/filter';
import { ModalService } from '@mixcore/ui/modal';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { tuiPure } from '@taiga-ui/cdk';
import { forkJoin } from 'rxjs';
import { DatabaseRelationshipComponent } from '../components/database-relationship/database-relationship.component';
import { DbContextSelectComponent } from '../components/db-context-select/db-context-select.component';
import { MasterDbStore } from '../store/master-db.store';

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
    DatabaseRelationshipComponent,
    DbContextSelectComponent,
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
  public masterStore = inject(MasterDbStore);
  public activeRoute = inject(ActivatedRoute);

  public selectedDbContextId?: number;
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

  public searchFields: string[] = [];
  public searchTexts: string = '';
  public get currentRouteSegments() {
    return this.activeRoute.snapshot.pathFromRoot
      .map((segment) => segment.url.map((urlSegment) => urlSegment.path))
      .reduce((acc, segments) => acc.concat(segments), []);
  }

  @tuiPure
  public filterDbs(
    dbs: MixDatabase[],
    selectedDbContextId: number | undefined,
    searchTexts?: string
  ) {
    let output = dbs;
    if (
      selectedDbContextId === undefined ||
      selectedDbContextId === DbContextFixId.All
    ) {
      output = dbs;
    } else if (selectedDbContextId === DbContextFixId.MasterDb) {
      output = dbs.filter((db) => db.mixDatabaseContextId === undefined);
    } else {
      output = dbs.filter(
        (db) => db.mixDatabaseContextId === selectedDbContextId
      );
    }

    if (!searchTexts) {
      return output;
    } else {
      const search = searchTexts.trim().toLowerCase();
      return (output = output.filter((d) =>
        d.displayName.trim().toLowerCase().includes(search)
      ));
    }
  }

  public goDetail(id: number) {
    this.router.navigate([...this.currentRouteSegments, id]);
  }

  public goDatabaseData(sysName: string) {
    this.router.navigate([...this.currentRouteSegments, 'query', sysName]);
  }

  public createDatabase() {
    this.router.navigate([...this.currentRouteSegments, 'create']);
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

  public selectedDbChange(id: number) {
    this.selectedDbContextId = id;
  }
}
