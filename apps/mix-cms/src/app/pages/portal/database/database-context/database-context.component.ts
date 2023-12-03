import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MixStatusIndicatorComponent,
  MixSubToolbarComponent,
} from '@mixcore/share/components';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DynamicFilterComponent } from '@mixcore/ui/filter';
import { MixDataTableModule } from '@mixcore/ui/table';

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
export class DatabaseContextComponent {}
