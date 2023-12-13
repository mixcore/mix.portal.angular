import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
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
  TaskStatusColors,
  TaskStatusDisplay,
  TaskTypeIcons,
} from '@mixcore/lib/model';
import { BaseComponent } from '@mixcore/share/base';
import { UserSelectComponent } from '@mixcore/share/components';
import { FormHelper, ObjectUtil } from '@mixcore/share/form';
import { MixUtcDatePipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInlineInputComponent } from '@mixcore/ui/inline-input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { delay, filter, take, takeUntil } from 'rxjs';
import { TaskService } from '../../store/task.service';
import { TaskStore } from '../../store/task.store';
import { StartEndDateComponent } from '../start-end-date/start-end-date.component';
import { StoryPointSelectComponent } from '../story-point-select/story-point-select.component';
import { TaskPrioritySelectComponent } from '../task-priority-select/task-priority-select.component';

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
    TaskPrioritySelectComponent,
    StoryPointSelectComponent,
  ],
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss'],
})
export class TaskDetailModalComponent extends BaseComponent implements OnInit {
  public static windowClass = 'top-align-modal';

  public taskService = inject(TaskService);
  public taskStore = inject(TaskStore);
  public toast = inject(HotToastService);
  public dialogRef = inject(DialogRef<{ task: MixTaskNew }>);

  public task!: MixTaskNew;
  public TaskTypeIconDisplay = TaskTypeIcons;
  public taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    taskStatus: new FormControl(TaskStatus.BACKLOG, Validators.required),
    taskPriority: new FormControl(TaskPriority.LOW, Validators.required),
    taskPoint: new FormControl(1),
    reporter: new FormControl(),
    startDate: new FormControl(),
    fromDate: new FormControl(),
    dueDate: new FormControl(),
  });
  public originalValue: object = {};
  public disableSave = signal(true);

  public TaskStatusColors = TaskStatusColors;
  public statusLabel = (status: TaskStatus) => TaskStatusDisplay[status];
  public statusItems = [
    TaskStatus.BACKLOG,
    TaskStatus.SELECTED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  ngOnInit() {
    this.taskStore
      .getTaskById(this.dialogRef.data.task.id)
      .pipe(
        filter(Boolean),
        take(1),
        delay(300),
        this.observerLoadingStateSignal()
      )
      .subscribe((task) => {
        this.task = task;
        this.taskForm.patchValue(this.task);
        this.originalValue = ObjectUtil.clone(this.taskForm.getRawValue());
        this.initValueChanged();
      });
  }

  public initValueChanged() {
    this.taskForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.disableSave.set(!ObjectUtil.diff(value, this.originalValue));
      });
  }

  public saveTask(close = true) {
    if (FormHelper.validateForm(this.taskForm)) {
      const value = {
        ...this.task,
        ...this.taskForm.value,
      };

      this.taskService
        .saveTask(value as MixTaskNew)
        .pipe(this.observerLoadingState())
        .subscribe({
          next: () => {
            this.taskStore.addTask(value as unknown as MixTaskNew, 'Update');
            if (close) this.dialogRef.close();
          },
          error: () => {
            this.toast.error('Something error, please try again');
          },
        });
    }
  }

  public onDateChange(value: { fromDate: Date; dueDate: Date | undefined }) {
    this.task.fromDate = value.fromDate;
    this.task.dueDate = value.dueDate;

    this.taskForm.controls.fromDate.patchValue(value.fromDate, {
      emitEvent: false,
    });
    this.taskForm.controls.dueDate.patchValue(value.dueDate, {
      emitEvent: false,
    });
    this.taskForm.updateValueAndValidity();
  }
}
