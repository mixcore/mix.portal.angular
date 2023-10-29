import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MixRole } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { RoleFormComponent } from '../../../components/role-form/role-form.component';
import { RolesStore } from '../../../stores/roles.store';

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
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  store = inject(RolesStore);
  router = inject(Router);
  mixApi = inject(MixApiFacadeService);

  showDetail = false;
  selectedRole?: MixRole;
  contextMenus: TableContextMenu<MixRole>[] = [
    {
      label: 'Edit',
      action: (item: MixRole) => {
        this.selectedRole = item;

        setTimeout(() => (this.showDetail = false));
        setTimeout(() => (this.showDetail = true));
      },
      icon: 'edit',
    },
    {
      label: 'Delete',
      action: (item: MixRole) => {
        //
      },
      icon: 'delete',
    },
  ];
}
