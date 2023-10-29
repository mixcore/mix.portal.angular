import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { MixButtonComponent } from '@mixcore/ui/button';

import { Router } from '@angular/router';
import { MixModule } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { CompressImageComponent } from '@mixcore/share/components';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { CMS_ROUTES } from '../../../app.routes';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { ModuleStore } from '../../../stores/module.store';

@Component({
  selector: 'mix-module',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    NgOptimizedImage,
    ImageHandleDirective,
    CompressImageComponent,
  ],
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModulesComponent {
  store = inject(ModuleStore);
  router = inject(Router);
  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  selectedPages: MixModule[] = [];

  contextMenus: TableContextMenu<MixModule>[] = [
    {
      label: 'Edit',
      action: (item: MixModule) => {
        this.goDetail(item.id);
      },
      icon: 'edit',
    },
    {
      label: 'Manage Data',
      action: (item: MixModule) => {
        this.goData(item.id);
      },
      icon: 'database',
    },
    {
      label: 'Clear Cache',
      action: (item: MixModule) => {
        this.mixApi.moduleApi
          .removeCache(item.id)
          .pipe(
            this.toast.observe({
              success: 'Successfully clear cache',
              error: 'Something error, please try again',
            })
          )
          .subscribe();
      },
      icon: 'autorenew',
    },
    {
      label: 'Delete',
      action: (item: MixModule) => {
        //
      },
      icon: 'delete',
    },
  ];

  goDetail(id: number) {
    this.router.navigateByUrl(`${CMS_ROUTES.portal.module.fullPath}/${id}`);
  }

  goData(id: number) {
    this.router.navigateByUrl(
      `${CMS_ROUTES.portal.module.fullPath}/${id}/data`
    );
  }

  addNew() {
    this.router.navigateByUrl(`${CMS_ROUTES.portal.module.fullPath}/create`);
  }
}
