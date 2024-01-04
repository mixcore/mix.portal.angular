import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from '@mixcore/share/base';
import { ToolbarService } from '@mixcore/share/components';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { DbContextSelectComponent } from './components/db-context-select/db-context-select.component';
import { DbUiStore } from './store/db-ui.store';

@Component({
  selector: 'database-layout',
  templateUrl: './database.layout.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    CommonModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    DbContextSelectComponent,
  ],
  styles: `
  .database-menu {
    height: unset !important;
    padding: 4px 14px !important;
    background: var(--background-color-primary);
  }
`,
})
export class DatabaseLayoutComponent extends BasePageComponent {
  public toolbarSrv = inject(ToolbarService);
  public uiStore = inject(DbUiStore);
}
