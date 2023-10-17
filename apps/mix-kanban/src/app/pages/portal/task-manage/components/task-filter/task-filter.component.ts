import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserAvatarComponent } from '@mixcore/share/components';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { tuiPure } from '@taiga-ui/cdk';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiFilterModule } from '@taiga-ui/kit';
import { UserInfoStore } from '../../../../../stores/user-info.store';
import { TaskFilterStore } from '../../store/filter.store';
import { TaskStore } from '../../store/task.store';

@Component({
  selector: 'mix-task-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixInputComponent,
    MixButtonComponent,
    UserAvatarComponent,
    TuiFilterModule,
    TuiLinkModule,
    SkeletonLoadingComponent,
  ],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFilterComponent implements OnInit {
  public userStore = inject(UserInfoStore);
  public taskStore = inject(TaskStore);
  public filterStore = inject(TaskFilterStore);
  public destroyRef = inject(DestroyRef);
  public userIds: string[] = [];

  public readonly filterItems = ['Only My Issues', 'Ignore Resolved'];
  public readonly filterForm = new FormGroup({
    filters: new FormControl([]),
  });

  ngOnInit() {
    this.filterStore.userIds$.subscribe(
      (filter) => (this.userIds = filter.userIds)
    );
  }

  @tuiPure
  public isUserActive(userIds: string[], id: string) {
    return userIds.includes(id);
  }
}
