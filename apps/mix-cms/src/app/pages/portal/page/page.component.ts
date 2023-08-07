import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { PageStore } from '../../../stores/page.store';

import { Router } from '@angular/router';
import { MixPage } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiHintModule } from '@taiga-ui/core';
import { CMS_ROUTES } from '../../../app.routes';
import { CompressImageComponent } from '../../../components/compress-image/compress-image.component';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
@Component({
  selector: 'mix-page',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    TuiHintModule,
    NgOptimizedImage,
    ImageHandleDirective,
    CompressImageComponent,
  ],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePageComponent {
  store = inject(PageStore);
  router = inject(Router);
  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  selectedPages: MixPage[] = [];

  contextMenus: TableContextMenu<MixPage>[] = [
    {
      label: 'Edit',
      action: (item: MixPage) => {
        this.goDetail(item.id);
      },
      icon: 'edit',
    },
    {
      label: 'Clear Cache',
      action: (item: MixPage) => {
        this.mixApi.postApi
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
      action: (item: MixPage) => {
        //
      },
      icon: 'delete',
    },
  ];

  goDetail(id: number) {
    this.router.navigateByUrl(`${CMS_ROUTES.portal.page.fullPath}/${id}`);
  }

  addNew() {
    this.router.navigateByUrl(`${CMS_ROUTES.portal.page.fullPath}/create`);
  }
}
