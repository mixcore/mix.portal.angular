import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MixTaskNew, TaskStatus, TaskStatusDisplay } from '@mixcore/lib/model';
import { Observable } from 'rxjs';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'mix-task-dnd-list',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, DragDropModule],
  templateUrl: './task-dnd-list.component.html',
  styleUrls: ['./task-dnd-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskDndListComponent implements OnInit {
  public destroyRef = inject(DestroyRef);
  public TaskStatusDisplay = TaskStatusDisplay;

  @Input() public status!: TaskStatus;
  @Input() public listTasks!: Observable<MixTaskNew[]>;
  public tasks: MixTaskNew[] = [];

  ngOnInit() {
    this.listTasks.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((v) => {
      this.tasks = v;
    });
  }
}
