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
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiBreadcrumbsModule } from '@taiga-ui/kit';
import { ToolbarService } from '../../components/main-toolbar/toolbar.service';
import { ProjectSelectComponent } from './components/project-select/project-select.component';
import { TaskManageStore } from './store/task-ui.store';

@Component({
  selector: 'task-manage-layout',
  templateUrl: './task-manage.layout.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule,
    CommonModule,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    ProjectSelectComponent,
  ],
  styles: `
    .project-menu {
      height: unset !important;
      padding: 4px 12px !important;
      background: var(--background-color-primary);
      border: 1px solid var(--tui-base-04)
    }
  `,
})
export class TaskManageLayoutComponent {
  @ViewChild('projectTroller') public projectCtrl!: TemplateRef<unknown>;

  public toolbarSrv = inject(ToolbarService);
  public viewRef = inject(ViewContainerRef);
  public uiStore = inject(TaskManageStore);

  ngAfterViewInit() {
    this.toolbarSrv.add(this.projectCtrl, this.viewRef);
  }

  ngOnDestroy() {
    this.toolbarSrv.remove();
  }
}
