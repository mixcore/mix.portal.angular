import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixButtonComponent } from '@mixcore/ui/button';
import { UserInfoStore } from '../../../../../stores/user-info.store';
import { TuiAvatarModule, TuiFilterModule } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mix-task-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixInputComponent,
    MixButtonComponent,
    TuiAvatarModule,
    TuiFilterModule,
  ],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent {
  public userStore = inject(UserInfoStore);

  public readonly filterItems = ['Only My Issues', 'Ignore Resolved'];
  public readonly filterForm = new FormGroup({
    filters: new FormControl([]),
  });
}
