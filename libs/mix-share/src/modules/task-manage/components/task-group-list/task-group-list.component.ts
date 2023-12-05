import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { MixTaskNew, TaskStatus, TaskStatusDisplay } from '@mixcore/lib/model';
import { TaskStore } from '../../store/task.store';
import { TaskDndListComponent } from '../task-dnd-list/task-dnd-list.component';
import { TaskParentCardComponent } from '../task-parent-card/task-parent-card.component';

@Component({
  selector: 'mix-task-group-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskDndListComponent,
    TaskParentCardComponent,
    DragDropModule,
  ],
  templateUrl: './task-group-list.component.html',
  styleUrls: ['./task-group-list.component.scss'],
})
export class TaskGroupListComponent {
  @Input() public parentTask!: MixTaskNew;
  @Input() public showHeader = false;
  @Input() public taskStatuses: TaskStatus[] = [];

  public TaskStatusDisplay = TaskStatusDisplay;
  public store = inject(TaskStore);
  public open = signal(true);

  public toggleExpand() {
    this.open.set(!this.open());
  }
}
