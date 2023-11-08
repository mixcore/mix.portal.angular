import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  TaskType,
} from '@mixcore/lib/model';
import { BaseComponent } from '@mixcore/share/base';
import { UserSelectComponent } from '@mixcore/share/components';
import { FormHelper } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { TaskService } from '../../store/task.service';
import { TaskStore } from '../../store/task.store';

@Component({
  selector: 'mix-task-create',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    MixSelectComponent,
    ReactiveFormsModule,
    MixEditorComponent,
    MixButtonComponent,
    UserSelectComponent,
  ],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreateComponent extends BaseComponent {
  public taskService = inject(TaskService);
  public taskStore = inject(TaskStore);
  public dialogRef = inject(DialogRef);
  public toast = inject(HotToastService);
  public parentTask?: MixTaskNew;

  public typeLabel = (type: TaskType) => type;
  public typeItems = [TaskType.BUG, TaskType.STORY, TaskType.TASK];

  public priorityLabel = (priority: TaskPriority) => priority;
  public prorityItems = [
    TaskPriority.LOWEST,
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
    TaskPriority.HIGHEST,
  ];

  public taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    type: new FormControl(TaskType.STORY, Validators.required),
    taskPriority: new FormControl(TaskPriority.LOW, Validators.required),
    taskStatus: new FormControl(TaskStatus.BACKLOG),
    reporter: new FormControl(),
    priority: new FormControl(999),
    parentTaskId: new FormControl(),
  });

  public ngOnInit() {
    this.parentTask = this.dialogRef.data?.['parentTask'];
    if (this.parentTask) {
      this.taskForm.controls.parentTaskId.patchValue(this.parentTask.id);
    } else {
      this.taskForm.controls.type.patchValue(TaskType.SWIMLANE);
    }
  }

  public createTask() {
    if (FormHelper.validateForm(this.taskForm)) {
      this.taskService
        .saveTask(this.taskForm.value as MixTaskNew)
        .pipe(this.observerLoadingState())
        .subscribe({
          next: (result) => {
            this.toast.success('Success add your new task');
            this.taskStore.addTask(result as unknown as MixTaskNew);
            this.dialogRef.close();
          },
          error: () => {
            this.toast.error('Something error, please try again');
          },
        });
    }
  }
}