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
import { UserSelectComponent } from '@mixcore/share/components';
import { FormHelper } from '@mixcore/share/form';
import { MixUtcDatePipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInlineInputComponent } from '@mixcore/ui/inline-input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, delay, filter, take } from 'rxjs';
import { TaskService } from '../../store/task.service';
import { TaskStore } from '../../store/task.store';
import { StartEndDateComponent } from '../start-end-date/start-end-date.component';

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
    MixDatePickerComponent,
    MixUtcDatePipe,
    StartEndDateComponent,
    UserSelectComponent,
    SkeletonLoadingComponent,
  ],
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent extends BaseComponent implements OnInit {
  public static windowClass = 'task-detail-modal';

  public taskService = inject(TaskService);
  public taskStore = inject(TaskStore);
  public toast = inject(HotToastService);
  public dialogRef = inject(DialogRef<{ task: MixTaskNew }>);

  public task!: MixTaskNew;
  public TaskTypeIconDisplay = TaskTypeIcons;
  public taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    taskStatus: new FormControl(TaskStatus.BACKLOG, Validators.required),
    taskPriority: new FormControl(TaskPriority.LOW, Validators.required),
    reporter: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
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
    this.taskStore
      .getTaskById(this.dialogRef.data.task.id)
      .pipe(
        filter(Boolean),
        take(1),
        delay(500),
        this.observerLoadingStateSignal()
      )
      .subscribe((task) => {
        this.task = task;
        this.taskForm.patchValue(this.task);
        this.initAutoSave();
      });
  }

  public initAutoSave() {
    this.taskForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.saveTask();
    });
  }

  public saveTask(close = true) {
    if (FormHelper.validateForm(this.taskForm)) {
      const value = {
        ...this.task,
        ...this.taskForm.value,
      };

      this.taskService.saveTask(value as MixTaskNew).subscribe({
        next: () => {
          this.taskStore.addTask(value as unknown as MixTaskNew, 'Update');
          // if (close) this.dialogRef.close();
        },
        error: () => {
          this.toast.error('Something error, please try again');
        },
      });
    }
  }
}
