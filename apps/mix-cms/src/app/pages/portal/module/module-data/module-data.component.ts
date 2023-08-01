import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GetModuleDataRequest,
  MixColumn,
  MixModule,
  MixModuleData,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { ModalService } from '@mixcore/ui/modal';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { CMS_ROUTES } from '../../../../app.routes';
import { DynamicDataDisplayComponent } from '../../../../components/dynamic-data-display/dynamic-data-display.component';
import { MixSubToolbarComponent } from '../../../../components/sub-toolbar/sub-toolbar.component';

@Component({
  selector: 'mix-module-data',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixDataTableModule,
    MixButtonComponent,
    RelativeTimeSpanPipe,
    DynamicDataDisplayComponent,
  ],
  templateUrl: './module-data.component.html',
  styleUrls: ['./module-data.component.scss'],
})
export class ModuleDataComponent extends BaseComponent {
  activatedRoute = inject(ActivatedRoute);
  mixApi = inject(MixApiFacadeService);
  router = inject(Router);
  modal = inject(ModalService);
  toast = inject(HotToastService);

  contextMenus: TableContextMenu<MixModuleData>[] = [
    {
      label: 'Edit',
      action: (item: MixModuleData) => {
        this.router.navigateByUrl(
          `${CMS_ROUTES.portal.module.fullPath}/${this.moduleId}/data/${item.id}`
        );
      },
      icon: 'edit',
    },
    {
      label: 'Delete',
      action: (item: MixModuleData) => {
        this.modal.asKForAction('Are you sure to delete data?', () => {
          this.mixApi.moduleDataApi
            .deleteById(item.id)
            .pipe(
              this.toast.observe({
                loading: 'Processing',
                success: 'Successfully apply your change',
                error: 'Something error, please try again',
              })
            )
            .subscribe(() => this.loadData());
        });
      },
      icon: 'delete',
    },
  ];

  moduleId?: number;
  module?: MixModule;
  columns: MixColumn[] = [];
  query = signal(<GetModuleDataRequest>{
    moduleContentId: 0,
    pageSize: 25,
    pageIndex: 0,
  });
  result = signal(<PaginationResultModel<MixModuleData>>{
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 25,
    },
  });

  constructor() {
    super();

    this.activatedRoute.params.pipe(takeUntilDestroyed()).subscribe((v) => {
      this.moduleId = v['id'];

      this.loadModule();
      this.loadData();
    });
  }

  loadModule() {
    if (this.moduleId === undefined) return;
    this.mixApi.moduleApi.getById(this.moduleId).subscribe({
      next: (v) => {
        this.module = v;
      },
    });
  }

  loadData() {
    if (this.moduleId === undefined) return;

    this.mixApi.moduleDataApi
      .gets({
        ...this.query(),
        moduleContentId: this.moduleId,
      })
      .pipe(this.observerLoadingStateSignal())
      .subscribe((v) => {
        this.columns = v.items[0].columns ?? [];
        this.result.set(v);
      });
  }

  public createNew() {
    this.router.navigateByUrl(
      `${CMS_ROUTES.portal.module.fullPath}/${this.moduleId}/data/create`
    );
  }
}
