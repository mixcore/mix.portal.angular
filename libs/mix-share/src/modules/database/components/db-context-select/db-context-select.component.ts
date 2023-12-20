import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DatabaseProvider,
  DbContextFixId,
  MixDbContext,
} from '@mixcore/lib/model';
import { TippyDirective } from '@ngneat/helipopper';
import { tuiPure } from '@taiga-ui/cdk';
import { DatabaseContextStore } from '../../store/db-context.store';

@Component({
  selector: 'mix-db-context-select',
  standalone: true,
  imports: [CommonModule, TippyDirective],
  templateUrl: './db-context-select.component.html',
  styleUrl: './db-context-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbContextSelectComponent {
  public store = inject(DatabaseContextStore);
  public contexts = signal<MixDbContext[]>([]);
  public destroy$ = inject(DestroyRef);
  public defaultContext = [
    {
      displayName: 'Master Db',
      databaseProvider: DatabaseProvider.MySQL,
      connectionString: '',
      schema: '',
      id: DbContextFixId.MasterDb,
    },
  ];

  @tuiPure
  public getLabelSize(size: 's' | 'm') {
    return size === 's' ? 'text-s' : 'text-xl';
  }

  @Input() public size: 's' | 'm' = 'm';
  @Input() public ignoreItemAll = false;
  @Input() public selectedItemId?: number;
  @Output() public selectedItemChange = new EventEmitter<MixDbContext>();

  ngOnInit() {
    this.store.vm$.pipe(takeUntilDestroyed(this.destroy$)).subscribe((vm) => {
      if (this.ignoreItemAll) {
        this.defaultContext = this.defaultContext.filter(
          (x) => x.id !== DbContextFixId.All
        );
      }
      this.contexts.set([...this.defaultContext, ...vm.data]);

      if (!this.selectedItemId) {
        this.selectItem(this.contexts()[0]);
      }
    });
  }

  @tuiPure
  public getSelected(db: MixDbContext[], selectedItemId?: number) {
    return db.find((x) => x.id === selectedItemId);
  }

  @tuiPure
  public getItemVm(item: MixDbContext) {
    return {
      displayName: item.displayName,
      subInfo:
        item.id !== DbContextFixId.MasterDb && item.id !== DbContextFixId.All
          ? item.databaseProvider
          : '',
    };
  }

  public selectItem(mixDb: MixDbContext) {
    this.selectedItemId = mixDb.id;
    this.selectedItemChange.emit(mixDb);
  }
}
