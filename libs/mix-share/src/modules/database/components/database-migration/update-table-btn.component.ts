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
  selector: 'mix-update-table-btn',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  template: `
    <mix-button
      [loading]="loadingState() === 'Loading'"
      (click)="updateSingleTable()"
      >Update data table</mix-button
    >

    <div>
      When you wish to make changes to your database or add new columns, run
      this migration.
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTableButtonComponent extends BaseComponent {
  @Input() public dbSysName?: string;
  public mixApi = inject(MixApiFacadeService);

  public updateSingleTable() {
    this.mixApi.databaseApi
      .updateDataTable(this.dbSysName!)
      .pipe(this.observerLoadingStateSignal())
      .subscribe();
  }
}
