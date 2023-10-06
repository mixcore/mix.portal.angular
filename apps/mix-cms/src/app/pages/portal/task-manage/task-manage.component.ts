import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStatus } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskDndListComponent } from './components/task-dnd-list/task-dnd-list.component';
import { TaskStore } from './store/task.store';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';

@Component({
  selector: 'mix-task-manage',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    ReactiveFormsModule,
    MixInputComponent,
    MixTextAreaComponent,
    ReactiveFormsModule,
    MixFormErrorComponent,
    MixEditorComponent,
    SkeletonLoadingComponent,
    TuiPaginationModule,
    TaskDndListComponent,
    TaskFilterComponent,
    DragDropModule,
  ],
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManageComponent extends BaseComponent {
  public mixApi = inject(MixApiFacadeService);
  public cdr = inject(ChangeDetectorRef);
  public toast = inject(HotToastService);
  public dialog = inject(DialogService);
  public store = inject(TaskStore);

  public taskStatuses: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.SELECTED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  constructor() {
    super();
  }

  public addTask() {
    this.dialog.open(TaskCreateComponent, { width: 800 });
  }
}
