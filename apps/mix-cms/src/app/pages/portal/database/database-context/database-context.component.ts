import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  DatabaseProvider,
  DatabaseProviderDisplay,
  MixDbContext,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import {
  MixStatusIndicatorComponent,
  MixSubToolbarComponent,
} from '@mixcore/share/components';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEmptyContentComponent } from '@mixcore/ui/empty-content';
import { DynamicFilterComponent } from '@mixcore/ui/filter';
import { ModalService } from '@mixcore/ui/modal';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { MixDataTableModule } from '@mixcore/ui/table';
import { DialogService } from '@ngneat/dialog';
import { TippyDirective } from '@ngneat/helipopper';
import { HotToastService } from '@ngneat/hot-toast';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiCardModule, TuiSurfaceModule } from '@taiga-ui/experimental';
import { TuiFilterModule } from '@taiga-ui/kit';
import { DbContextFormComponent } from '../components/db-context-form/db-context-form.component';
import { DatabaseContextStore } from '../store/db-context.store';

@Component({
  selector: 'mix-database-context',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    DynamicFilterComponent,
    TuiCardModule,
    TuiSurfaceModule,
    TuiFilterModule,
    MixEmptyContentComponent,
    SkeletonLoadingComponent,
    TippyDirective,
    TuiLoaderModule,
  ],
  templateUrl: './database-context.component.html',
  styleUrl: './database-context.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseContextComponent {
  public dialog = inject(DialogService);
  public store = inject(DatabaseContextStore);
  public modal = inject(ModalService);
  public mixApi = inject(MixApiFacadeService);
  public toast = inject(HotToastService);

  public ProviderIconMap: Record<DatabaseProvider, string> = {
    [DatabaseProvider.SQLSERVER]: 'sqlserver',
    [DatabaseProvider.MySQL]: 'mysql',
    [DatabaseProvider.PostgreSQL]: 'postgres',
    [DatabaseProvider.SQLITE]: 'sqlite',
  };

  public filterForm = inject(FormBuilder).control<DatabaseProvider[]>([]);
  public filterItems = Object.values(DatabaseProvider);
  public ProviderLabel = DatabaseProviderDisplay as any;
  public selected?: MixDbContext;

  @tuiPure
  public combineFilter(
    value: MixDbContext[],
    filterValue: DatabaseProvider[] | null
  ): MixDbContext[] {
    if (!filterValue?.length) return value;
    return value.filter((v) => filterValue.includes(v.databaseProvider));
  }

  public addContext() {
    const dialogRef = this.dialog.open(DbContextFormComponent, {
      windowClass: 'top-align-modal',
    });

    dialogRef.afterClosed$.subscribe((isReload) => {
      if (isReload) this.store.reload();
    });
  }

  public onDelete() {
    if (!this.selected) return;

    this.modal.asKForAction('Are you sure to delete this item?', () => {
      this.mixApi.databaseContext
        .deleteById(this.selected!.id)
        .pipe(toastObserverProcessing(this.toast))
        .subscribe({
          next: () => {
            this.store.reload();
          },
        });
    });
  }
}
