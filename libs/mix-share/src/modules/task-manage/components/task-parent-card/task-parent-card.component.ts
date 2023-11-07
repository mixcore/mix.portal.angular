import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MixTaskNew } from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DialogService } from '@ngneat/dialog';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'mix-task-parent-card',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  templateUrl: './task-parent-card.component.html',
  styleUrls: ['./task-parent-card.component.scss'],
})
export class TaskParentCardComponent {
  @Input() public task!: MixTaskNew;
  @Input() public open = true;
  @Output() public expandClick = new EventEmitter();
  public dialog = inject(DialogService);

  public addTask() {
    this.dialog.open(TaskCreateComponent, {
      width: 800,
      data: {
        parentTask: this.task,
      },
    });
  }
}
