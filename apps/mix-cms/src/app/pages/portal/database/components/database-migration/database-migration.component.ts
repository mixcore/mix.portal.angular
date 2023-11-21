import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { MixButtonComponent } from '@mixcore/ui/button';

@Component({
  selector: 'mix-database-migration',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  templateUrl: './database-migration.component.html',
  styleUrl: './database-migration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseMigrationComponent extends BaseComponent {
  @Input() public dbSysName?: string;
  public mixApi = inject(MixApiFacadeService);

  public migrateSingleTable() {
    this.mixApi.databaseApi
      .migrateToSingleTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }

  public updateSingleTable() {
    this.mixApi.databaseApi
      .updateDataTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }

  public backupSingleTable() {
    this.mixApi.databaseApi
      .backupTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }

  public restoreSingleTable() {
    this.mixApi.databaseApi
      .restoreTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }
}
