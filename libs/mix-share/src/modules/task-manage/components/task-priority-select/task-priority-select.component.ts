import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { TaskPriority, TaskPriorityIcon } from '@mixcore/lib/model';
import { BaseTextControl } from '@mixcore/ui/base-control';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { TaskPriorityComponent } from '../task-priority/task-priority.component';

@Component({
  selector: 'task-priority-select',
  standalone: true,
  imports: [
    CommonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TaskPriorityComponent,
  ],
  templateUrl: './task-priority-select.component.html',
  styleUrls: ['./task-priority-select.component.scss'],
})
export class TaskPrioritySelectComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @Input() public size: 'm' | 's' | 'l' = 'm';
  public Icon = TaskPriorityIcon;
  public prorityItems = [
    TaskPriority.LOWEST,
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
    TaskPriority.HIGHEST,
  ];
}
