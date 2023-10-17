import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MixTaskNew,
  TaskPriority,
  TaskStatus,
  TaskStatusDisplay,
  TaskTypeIcons,
} from '@mixcore/lib/model';
import { BaseComponent } from '@mixcore/share/base';
import { FormHelper } from '@mixcore/share/form';
import { MixUtcDatePipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInlineInputComponent } from '@mixcore/ui/inline-input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { UserSelectComponent } from '../../../../../components/user-select/user-select.component';
import { TaskService } from '../../store/task.service';
import { TaskStore } from '../../store/task.store';

@Component({
  selector: 'mix-task-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixInlineInputComponent,
    MixEditorComponent,
    MixButtonComponent,
    MixSelectComponent,
    MixUtcDatePipe,
    UserSelectComponent
  ],
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent extends BaseComponent implements OnInit {
  public taskService = inject(TaskService);
  public taskStore = inject(TaskStore);
  public toast = inject(HotToastService);
  public dialogRef = inject(DialogRef<{ task: MixTaskNew }>)

  public task!: MixTaskNew;
  public TaskTypeIconDisplay = TaskTypeIcons;
  public taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    taskStatus: new FormControl(TaskStatus.BACKLOG, Validators.required),
    taskPriority: new FormControl(TaskPriority.LOW, Validators.required),
    reporter: new FormControl()
  });

  public statussLabel = (status: TaskStatus) => TaskStatusDisplay[status];
  public statusItems = [
    TaskStatus.BACKLOG,
    TaskStatus.SELECTED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  public priorityLabel = (priority: TaskPriority) => priority;
  public prorityItems = [
    TaskPriority.LOWEST,
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
    TaskPriority.HIGHEST,
  ];

  ngOnInit() {
    this.task = this.dialogRef.data.task;
    this.taskForm.patchValue(this.task);
  }

  public saveTask(close = true) {
    if (FormHelper.validateForm(this.taskForm)) {
      const value = {
        ...this.task,
        ...this.taskForm.value
      }

      this.taskService
        .saveTask(value as MixTaskNew)
        .pipe(this.observerLoadingState())
        .subscribe({
          next: (result) => {
            this.toast.success('Success update your task');
            this.taskStore.addTask(result as unknown as MixTaskNew, 'Update');
            if (close )this.dialogRef.close();
          },
          error: () => {
            this.toast.error('Something error, please try again');
          },
        });
    }
  }
}
