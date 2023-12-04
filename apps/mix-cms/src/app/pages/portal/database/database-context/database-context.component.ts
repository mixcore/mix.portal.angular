import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatabaseProvider } from '@mixcore/lib/model';
import {
  MixStatusIndicatorComponent,
  MixSubToolbarComponent,
} from '@mixcore/share/components';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DynamicFilterComponent } from '@mixcore/ui/filter';
import { MixDataTableModule } from '@mixcore/ui/table';
import { DialogService } from '@ngneat/dialog';
import { TuiCardModule, TuiSurfaceModule } from '@taiga-ui/experimental';
import { DbContextFormComponent } from '../components/db-context-form/db-context-form.component';
import { DatabaseContextStore } from '../store/db-context.store';

@Component({
  selector: 'mix-database-context',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    DynamicFilterComponent,
    TuiCardModule,
    TuiSurfaceModule,
  ],
  templateUrl: './database-context.component.html',
  styleUrl: './database-context.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseContextComponent {
  public dialog = inject(DialogService);
  public store = inject(DatabaseContextStore);

  public ProviderIconMap: Record<DatabaseProvider, string> = {
    [DatabaseProvider.SQLSERVER]: 'sqlserver',
    [DatabaseProvider.MySQL]: 'mysql',
    [DatabaseProvider.PostgreSQL]: 'postgres',
    [DatabaseProvider.SQLLITE]: 'sqllite',
  };

  public addContext() {
    const dialogRef = this.dialog.open(DbContextFormComponent, {
      windowClass: 'top-align-modal',
    });

    dialogRef.afterClosed$.subscribe((isReload) => {
      if (isReload) this.store.reload();
    });
  }
}
