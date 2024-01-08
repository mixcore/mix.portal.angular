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
  selector: 'mix-restore-table-btn',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  template: `
    <mix-button
      style="width: fit-content; display: block"
      [type]="'danger'"
      [loading]="loadingState() === 'Loading'"
      (click)="restoreSingleTable()"
      >Restore table</mix-button
    >

    <div>
      Depending on when you last backed up the data, the system will restore it.
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreTableButtonComponent extends BaseComponent {
  @Input() public dbSysName?: string;
  public mixApi = inject(MixApiFacadeService);

  public restoreSingleTable() {
    this.mixApi.databaseApi
      .restoreTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }
}
