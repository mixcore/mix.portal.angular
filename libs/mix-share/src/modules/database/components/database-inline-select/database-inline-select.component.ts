import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MixDatabase } from '@mixcore/lib/model';
import { BaseState } from '@mixcore/share/base';
import { TippyDirective } from '@ngneat/helipopper';
import { tuiPure } from '@taiga-ui/cdk';
import { MasterDbStore } from '../../store/master-db.store';

@Component({
  selector: 'mix-database-inline-select',
  standalone: true,
  imports: [CommonModule, TippyDirective],
  templateUrl: './database-inline-select.component.html',
  styleUrl: './database-inline-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseInlineSelectComponent {
  public store = inject(MasterDbStore);
  public state = signal<BaseState<MixDatabase> | undefined>(undefined);

  @Input() public selectedItemId?: number;
  @Input() public selectedItemName?: string;
  @Output() public selectedItemChange = new EventEmitter<MixDatabase>();

  constructor() {
    effect(
      () => {
        const state = this.store.stateSignal();
        this.state.set(state);
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.store.stateSignal();
  }

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
