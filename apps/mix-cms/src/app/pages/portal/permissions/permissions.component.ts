import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MixPermission } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { ModalService } from '@mixcore/ui/modal';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { tap } from 'rxjs';
import { PermissionFormComponent } from '../../../components/permission-form/permission-form.component';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { PermissionsStore } from '../../../stores/permission.store';

@Component({
  selector: 'mix-permissions',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    RelativeTimeSpanPipe,
    NgOptimizedImage,
    ImageHandleDirective,
    MixStatusIndicatorComponent,
    PermissionFormComponent,
  ],
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent {
  store = inject(PermissionsStore);
  router = inject(Router);
  mixApi = inject(MixApiFacadeService);
  modal = inject(ModalService);
  toast = inject(HotToastService);

  showDetail = false;
  selectedPerm?: MixPermission;

  contextMenus: TableContextMenu<MixPermission>[] = [
    {
      label: 'Edit',
      action: (item: MixPermission) => {
        this.selectedPerm = item;
        this.showDetail = true;
      },
      icon: 'edit',
    },
    {
      label: 'Delete',
      action: (item: MixPermission) => {
        this.modal.asKForAction('Are you sure to delete this item ?', () => {
          this.mixApi.permissionApi
            .deleteById(item.id)
            .pipe(
              this.toast.observe({
                loading: 'Processing.',
                success: 'Successfully apply your change.',
                error: 'Something error, please try again later.',
              }),
              tap(() => this.store.reload())
            )
            .subscribe();
        });
      },
      icon: 'delete',
    },
  ];
}
