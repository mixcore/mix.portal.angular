import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  TaskStatus,
  TaskStatusColors,
  TaskStatusDisplay,
} from '@mixcore/lib/model';

@Component({
  selector: 'mix-task-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
})
export class TaskHeaderComponent {
  public TaskStatusDisplay = TaskStatusDisplay;
  public TaskStatusColors = TaskStatusColors;
  public taskStatuses: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.SELECTED,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
}
