import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserListVm } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { MixFormErrorComponent } from '@mixcore/share/form';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixErrorAlertComponent } from '@mixcore/ui/error';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { DialogService } from '@ngneat/dialog';
import { tuiPure } from '@taiga-ui/cdk';
import { UserStore } from '../stores/user.store';
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { UserDetailDialogComponent } from './components/user-detail-dialog/user-detail-dialog.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'mix-user',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    RelativeTimeSpanPipe,
    NgOptimizedImage,
    ImageHandleDirective,
    MixInputComponent,
    MixFormErrorComponent,
    MixErrorAlertComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserService],
})
export class UserComponent extends BaseComponent {
  public store = inject(UserStore);
  public router = inject(Router);
  public mixApi = inject(MixApiFacadeService);
  public dialog = inject(DialogService);
  public userService = inject(UserService);
  public selectedUsers: UserListVm[] = [];
  public contextMenus: TableContextMenu<UserListVm>[] = [
    {
      label: 'Edit',
      icon: 'edit',
      action: (item: UserListVm) => this.editUser(item),
    },
    {
      label: 'Delete',
      icon: 'delete',
      action: (item: UserListVm) => this.userService.deleteUser(item.id),
    },
  ];

  public showDialog(): void {
    this.dialog.open(CreateUserDialogComponent, {
      enableClose: { backdrop: false, escape: true },
    });
  }

  public editUser(item: UserListVm): void {
    this.dialog.open(UserDetailDialogComponent);
  }

  @tuiPure
  public getNameFromMail(name: string) {
    const last = name.lastIndexOf('@');
    if (last > 0) return name.substring(0, last);

    return name;
  }
}
