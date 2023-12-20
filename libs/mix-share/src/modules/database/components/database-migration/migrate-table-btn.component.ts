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
  selector: 'mix-migrate-table-btn',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  template: `
    <mix-button
      [loading]="loadingState() === 'Loading'"
      (click)="migrateSingleTable()"
      >Migrate to single table</mix-button
    >

    <div>
      Before using a database that you have created for the first time, it must
      be migrated into a single table.
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MigrateTableButtonComponent extends BaseComponent {
  @Input() public dbSysName?: string;
  public mixApi = inject(MixApiFacadeService);

  public migrateSingleTable() {
    this.mixApi.databaseApi
      .migrateToSingleTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }
}
