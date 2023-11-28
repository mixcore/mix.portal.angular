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
  selector: 'mix-backup-table-btn',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  template: `
    <mix-button
      [loading]="loadingState() === 'Loading'"
      (click)="backupSingleTable()"
      >Backup table</mix-button
    >

    <div>
      When you activate this button, the system will automatically backup your
      data in case you need it in the future.
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackupTableButtonComponent extends BaseComponent {
  @Input() public dbSysName?: string;
  public mixApi = inject(MixApiFacadeService);

  public backupSingleTable() {
    this.mixApi.databaseApi
      .backupTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }
}
