import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskFilterStore } from '../../store/filter.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TaskStore } from '../../store/task.store';
import { TaskService } from '../../store/task.service';
import { HotToastService } from '@ngneat/hot-toast';

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
  public taskStore = inject(TaskStore);
  public taskService = inject(TaskService);
  public toast = inject(HotToastService);

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

  public drop(event: CdkDragDrop<MixTaskNew[]>) {
    const newIssue: MixTaskNew = { ...event.item.data };
    const newIssues = [...event.container.data];

    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this.updateListPosition(newIssues);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        newIssues,
        event.previousIndex,
        event.currentIndex
      );

      const newIssueIndex = newIssues.findIndex((x) => x.id === newIssue.id);
      newIssues[newIssueIndex].taskStatus = event.container.id as TaskStatus;
      this.updateListPosition(newIssues);
    }
  }

  private updateListPosition(newList: MixTaskNew[]) {
    const requests = newList.map((issue, idx) => {
      const newIssueWithNewPosition = { ...issue, priority: idx + 1 };
      this.taskStore.addTask(newIssueWithNewPosition, 'Update');
      return this.taskService.saveTask(newIssueWithNewPosition);
    });

    forkJoin(requests)
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Succesfully update your task',
          error: 'Something error, please try again',
        })
      )
      .subscribe();
  }
}
