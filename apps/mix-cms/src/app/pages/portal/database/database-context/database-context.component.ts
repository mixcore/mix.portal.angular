import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MixStatusIndicatorComponent,
  MixSubToolbarComponent,
} from '@mixcore/share/components';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DynamicFilterComponent } from '@mixcore/ui/filter';
import { MixDataTableModule } from '@mixcore/ui/table';
import { DialogService } from '@ngneat/dialog';
import { DbContextFormComponent } from '../components/db-context-form/db-context-form.component';

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
  ],
  templateUrl: './database-context.component.html',
  styleUrl: './database-context.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseContextComponent {
  public dialog = inject(DialogService);

  public addContext() {
    this.dialog.open(DbContextFormComponent, {
      windowClass: 'top-align-modal',
    });
  }
}
