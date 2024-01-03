import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, TemplateRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MixRole } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { ImageHandleDirective, MixAutoFocus } from '@mixcore/share/directives';
import { FormHelper } from '@mixcore/share/form';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { DialogCloseDirective, DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { RoleFormComponent } from '../components/role-form/role-form.component';
import { RolesStore } from '../stores/roles.store';

@Component({
  selector: 'mix-roles',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    RelativeTimeSpanPipe,
    NgOptimizedImage,
    ImageHandleDirective,
    RoleFormComponent,
    MixInputComponent,
    MixAutoFocus,
    DialogCloseDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent extends BaseComponent {
  public store = inject(RolesStore);
  public router = inject(Router);
  public mixApi = inject(MixApiFacadeService);
  public dialog = inject(DialogService);
  public toast = inject(HotToastService);
  public modal = inject(ModalService);

  public showDetail = false;
  public selectedRole?: MixRole;
  public loading = signal(false);
  public roleName = new FormControl('', {
    validators: Validators.required,
    nonNullable: true,
  });
  public contextMenus: TableContextMenu<MixRole>[] = [
    {
      label: 'Edit',
      action: (item: MixRole) => {
        this.selectedRole = item;
      },
      icon: 'edit',
    },
    {
      label: 'Delete',
      action: (item: MixRole) => {
        this.deleteRoles(item);
      },
      icon: 'delete',
    },
  ];

  onCreate(template: TemplateRef<unknown>) {
    this.dialog.open(template);
  }

  public createRoles() {
    if (FormHelper.validateForm(this.roleName)) {
      const value = {
        name: this.roleName.value,
        normalizedName: this.roleName.value.toUpperCase(),
      };

      this.mixApi.roleApi
        .save(value)
        .pipe(this.observerLoadingStateSignal())
        .subscribe({
          next: (result) => {
            this.toast.success('Successfully add new Role');
            this.store.addRole({
              ...value,
              id: result as unknown as string,
            });
            this.dialog.closeAll();
          },
        });
    }
  }

  public deleteRoles(role: MixRole) {
    this.modal.asKForAction(
      'Are you sure to delete this Role, this may affect to user have this role.',
      () => {
        this.mixApi.roleApi
          .deleteById(role.id)
          .pipe(toastObserverProcessing(this.toast))
          .subscribe(() => this.store.removeData(role.id));
      }
    );
  }
}
