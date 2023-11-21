import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { MixDatabase } from '@mixcore/lib/model';
import { DatabaseStore } from '@mixcore/share/stores';
import { TippyDirective } from '@ngneat/helipopper';
import { tuiPure } from '@taiga-ui/cdk';

@Component({
  selector: 'mix-database-inline-select',
  standalone: true,
  imports: [CommonModule, TippyDirective],
  templateUrl: './database-inline-select.component.html',
  styleUrl: './database-inline-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseInlineSelectComponent {
  public store = inject(DatabaseStore);

  @Input() public selectedItemId?: number;
  @Input() public selectedItemName?: string;
  @Output() public selectedItemChange = new EventEmitter<MixDatabase>();

  @tuiPure
  public getSelectedDbName(
    db: MixDatabase[],
    selectedItemId?: number,
    selectedItemName?: string
  ) {
    return db.find(
      (x) => x.id === selectedItemId || x.systemName === selectedItemName
    );
  }

  public selectDb(mixDb: MixDatabase) {
    this.selectedItemId = mixDb.id;
    this.selectedItemChange.emit(mixDb);
  }
}
