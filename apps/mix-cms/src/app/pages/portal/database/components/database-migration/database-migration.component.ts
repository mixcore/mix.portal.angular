import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { BackupTableButtonComponent } from './backup-table-btn.component';
import { MigrateTableButtonComponent } from './migrate-table-btn.component';
import { RestoreTableButtonComponent } from './restore-table-btn.component';
import { UpdateTableButtonComponent } from './update-table-btn.component';

@Component({
  selector: 'mix-database-migration',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    UpdateTableButtonComponent,
    MigrateTableButtonComponent,
    BackupTableButtonComponent,
    RestoreTableButtonComponent,
  ],
  template: `
    @if (!dbSysName) {
    <div class="mt-1 mb-2 notification --info">
      Create your db first to run some migrations
    </div>
    } @else {
    <div class="mb-3 mt-1">
      <mix-migrate-table-btn [dbSysName]="dbSysName"></mix-migrate-table-btn>
    </div>

    <div class="mb-3">
      <mix-backup-table-btn [dbSysName]="dbSysName"></mix-backup-table-btn>
    </div>

    <div class="mb-3">
      <mix-restore-table-btn [dbSysName]="dbSysName"></mix-restore-table-btn>
    </div>

    <div class="mb-3">
      <mix-update-table-btn [dbSysName]="dbSysName"></mix-update-table-btn>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseMigrationComponent {
  @Input() public dbSysName?: string;
}
