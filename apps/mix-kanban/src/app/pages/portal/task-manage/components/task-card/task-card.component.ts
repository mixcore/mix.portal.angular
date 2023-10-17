import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
import {
  MixTaskNew,
  TaskPriorityColors,
  TaskTypeIcons,
  UserListVm,
} from '@mixcore/lib/model';
import { DialogService } from '@ngneat/dialog';
import { take } from 'rxjs';
import { UserAvatarComponent } from '../../../../../components/user-avatar/user-avatar.component';
import { UserInfoStore } from '../../../../../stores/user-info.store';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';
import { TaskPriorityComponent } from '../task-priority/task-priority.component';

@Component({
  selector: 'mix-task-card',
  standalone: true,
  imports: [CommonModule, TaskPriorityComponent, UserAvatarComponent],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnChanges {
  @Input() public task!: MixTaskNew;
  public dialog = inject(DialogService);
  public userInfoStore = inject(UserInfoStore);
  public cdr = inject(ChangeDetectorRef);

  public TaskPriorityColor = TaskPriorityColors;
  public TaskTypeIcon = TaskTypeIcons;
  public userInfo: UserListVm | undefined;

  public onClick() {
    this.dialog.open(TaskDetailModalComponent, {
      width: 1024,
      data: { task: this.task },
    });
  }

  public ngOnChanges() {
    if (this.task.reporter) {
      this.userInfoStore
        .getUserById(this.task.reporter)
        .pipe(take(1))
        .subscribe((info) => {
          this.userInfo = info;
          this.cdr.detectChanges();
        });
    }
  }
}
