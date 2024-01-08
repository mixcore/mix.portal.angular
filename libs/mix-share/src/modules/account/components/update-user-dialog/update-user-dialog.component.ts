import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MixRole, UserListVm } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { AuthService } from '@mixcore/share/auth';
import { BaseComponent } from '@mixcore/share/base';
import { MixAutoFocus } from '@mixcore/share/directives';
import { MixFormErrorComponent } from '@mixcore/share/form';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { UserInfoStore } from '@mixcore/share/stores';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInlineInputComponent } from '@mixcore/ui/inline-input';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { RolesStore } from '../../stores/roles.store';
import { UserStore } from '../../stores/user.store';
import { RoleActiveComponent } from '../role-active/role-active.component';

@Component({
  selector: 'update-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixInputComponent,
    MixInlineInputComponent,
    MixFormErrorComponent,
    MixTextAreaComponent,
    MixAutoFocus,
    ReactiveFormsModule,
    RoleActiveComponent,
  ],
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserDialogComponent extends BaseComponent {
  public store = inject(UserStore);
  public infoStore = inject(UserInfoStore);
  public roleStore = inject(RolesStore);

  public mixApi = inject(MixApiFacadeService);
  public dialog = inject(DialogService);
  public toast = inject(HotToastService);
  public dialogRef = inject(DialogRef);
  public authService = inject(AuthService);

  public roleDict: Record<string, boolean> = {};
  public userData!: UserListVm;
  public userForm = new FormGroup({
    avatar: new FormControl('', { validators: [], nonNullable: true }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    firstName: new FormControl('', { validators: [], nonNullable: true }),
    lastName: new FormControl('', { validators: [], nonNullable: true }),
    email: new FormControl('', {
      validators: [Validators.email],
      nonNullable: true,
    }),
  });

  ngOnInit() {
    this.userData = this.dialogRef.data;
    this.userForm.patchValue(this.userData);
    (this.userData.roles || []).forEach((role) => {
      this.roleDict[role.roleId!] = true;
    });
  }

  public userRoleChange(role: MixRole, active: boolean) {
    this.authService
      .toggleUserInRoles(active, role.id, role.name, this.userData.id)
      .pipe(toastObserverProcessing(this.toast))
      .subscribe({
        next: () => {
          this.roleDict[role.id] = active;
        },
      });
  }
}
