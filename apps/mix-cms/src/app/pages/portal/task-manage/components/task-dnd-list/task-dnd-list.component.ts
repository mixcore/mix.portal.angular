import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  MixTask,
  MixTaskNew,
  TaskStatus,
  TaskStatusDisplay,
} from '@mixcore/lib/model';
import { Observable, combineLatest } from 'rxjs';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFilterStore } from '../../store/filter.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  public cdr = inject(ChangeDetectorRef);

  public TaskStatusDisplay = TaskStatusDisplay;

  @Input() public status!: TaskStatus;
  @Input() public listTasks!: Observable<MixTaskNew[]>;
  public tasks: MixTaskNew[] = [];

  constructor(public filterStore: TaskFilterStore) {}

  ngOnInit() {
    combineLatest([this.listTasks, this.filterStore.userIds$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([tasks, filter]) => {
        this.combineFilter(tasks, filter.userIds);
      });
  }

  public combineFilter(tasks: MixTaskNew[], userIds: string[]) {
    if (!userIds?.length) {
      this.tasks = tasks;
    } else {
      this.tasks = tasks.filter(
        (task) => task.reporter && userIds.includes(task.reporter)
      );
    }

    this.cdr.detectChanges();
  }
}
