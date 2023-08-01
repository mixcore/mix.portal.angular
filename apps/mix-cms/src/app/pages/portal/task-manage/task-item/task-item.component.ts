import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MixTask } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { ModalService } from '@mixcore/ui/modal';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-task-item',
  standalone: true,
  imports: [
    CommonModule,
    RelativeTimeSpanPipe,
    DragDropModule,
    TuiAvatarModule,
    MixButtonComponent,
  ],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent extends BaseComponent implements OnInit {
  public mixApi = inject(MixApiFacadeService);
  public modal = inject(ModalService);
  public toast = inject(HotToastService);
  public cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) task!: MixTask;
  @Output() taskDelete: EventEmitter<void> = new EventEmitter();

  public showKanbanView = false;

  public listNew: MixTask[] = [];
  public listInProgress: MixTask[] = [];
  public listReadyTest: MixTask[] = [];
  public listDone: MixTask[] = [];
  public statusDisplay: Record<string, string> = {
    New: 'New',
    ReadyForTest: 'Ready For Testing',
    InProgress: 'In Progress',
    Done: 'Done',
  };

  ngOnInit() {
    switch (this.task.taskStatus) {
      case 'New':
        this.listNew.push(this.task);
        break;
      case 'InProgress':
        this.listInProgress.push(this.task);
        break;
      case 'ReadyForTest':
        this.listReadyTest.push(this.task);
        break;
      default:
        this.listDone.push(this.task);
    }
  }

  public drop(
    event: CdkDragDrop<MixTask[]>,
    status: 'New' | 'ReadyForTest' | 'InProgress' | 'Done'
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const data = event.item.data as MixTask;
      this.mixApi.databaseApi
        .saveData(
          'mixTask',
          data.id,
          {
            ...data,
            taskStatus: status,
          },
          'Task'
        )
        .subscribe(() => {
          this.task.taskStatus = status;
          this.cdr.detectChanges();
        });
    }
  }

  public deleteClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.modal.asKForAction('Are you sure to delete this item', () => {
      this.mixApi.databaseApi
        .deleteData('mixTask', this.task.id)
        .pipe(
          this.toast.observe({
            loading: 'Deleting...',
            success: 'Successfully remove your task',
            error: 'Something error, pleas try again',
          })
        )
        .subscribe(() => {
          this.taskDelete.emit();
        });
    });
  }
}
