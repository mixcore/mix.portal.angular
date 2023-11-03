import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  TaskPriority,
  TaskPriorityColors,
  TaskPriorityIcon,
} from '@mixcore/lib/model';

@Component({
  selector: 'mix-task-priority',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPriorityComponent {
  @Input() public priority!: TaskPriority;

  public PriorityColor = TaskPriorityColors;
  public PriorityIcon = TaskPriorityIcon;
}
