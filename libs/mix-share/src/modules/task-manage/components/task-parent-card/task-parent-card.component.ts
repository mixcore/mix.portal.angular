import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { MixTaskNew, UserListVm } from '@mixcore/lib/model';
import { UserAvatarComponent } from '@mixcore/share/components';
import { UserInfoStore } from '@mixcore/share/stores';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DialogService } from '@ngneat/dialog';
import { take } from 'rxjs';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'mix-task-parent-card',
  standalone: true,
  imports: [CommonModule, MixButtonComponent, UserAvatarComponent],
  templateUrl: './task-parent-card.component.html',
  styleUrls: ['./task-parent-card.component.scss'],
})
export class TaskParentCardComponent {
  @Input() public task!: MixTaskNew;
  @Input() public open = true;
  @Output() public expandClick = new EventEmitter();
  public dialog = inject(DialogService);
  public userInfoStore = inject(UserInfoStore);
  public userInfo = signal<UserListVm | undefined>(undefined);

  public addTask() {
    this.dialog.open(TaskCreateComponent, {
      width: 800,
      windowClass: 'top-align-modal',
      data: {
        parentTask: this.task,
      },
    });
  }

  public ngOnChanges() {
    if (!this.task.reporter || this.userInfo()) return;

    this.userInfoStore
      .getUserById(this.task.reporter)
      .pipe(take(1))
      .subscribe((info) => {
        this.userInfo.set(info);
      });
  }
}
