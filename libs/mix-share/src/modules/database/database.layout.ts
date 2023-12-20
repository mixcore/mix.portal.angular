import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
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
    border: 1px solid var(--tui-base-04);
    border-radius: 8px;
  }
`,
})
export class DatabaseLayoutComponent {
  @ViewChild('contextCtrl') public projectCtrl!: TemplateRef<unknown>;

  public toolbarSrv = inject(ToolbarService);
  public viewRef = inject(ViewContainerRef);
  public uiStore = inject(DbUiStore);

  ngAfterViewInit() {
    this.toolbarSrv.add(this.projectCtrl, this.viewRef);
  }

  ngOnDestroy() {
    this.toolbarSrv.remove();
  }
}
