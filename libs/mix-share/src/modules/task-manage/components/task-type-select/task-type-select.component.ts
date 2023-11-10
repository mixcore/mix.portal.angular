import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { TaskType, TaskTypeIcons } from '@mixcore/lib/model';
import { BaseTextControl } from '@mixcore/ui/base-control';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';

@Component({
  selector: 'task-type-select',
  standalone: true,
  imports: [
    CommonModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-type-select.component.html',
  styleUrls: ['./task-type-select.component.scss'],
})
export class TaskTypeSelectComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @Input() public size: 'm' | 's' | 'l' = 'm';
  public typeLabel = (type: TaskType) => type;
  public Icon = TaskTypeIcons;
  public typeItems = [TaskType.BUG, TaskType.STORY, TaskType.TASK];
}
