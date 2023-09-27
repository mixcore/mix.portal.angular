import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  MixTaskNew,
  TaskPriorityColors,
  TaskTypeIcons,
} from '@mixcore/lib/model';
import { DialogService } from '@ngneat/dialog';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'mix-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() public task!: MixTaskNew;
  public dialog = inject(DialogService);
  public TaskPriorityColor = TaskPriorityColors;
  public TaskTypeIcon = TaskTypeIcons;

  public onClick() {
    this.dialog.open(TaskDetailModalComponent, {
      width: 1024,
      data: { task: this.task },
    });
  }
}
