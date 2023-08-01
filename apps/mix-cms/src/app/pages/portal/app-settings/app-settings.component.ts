import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  MixSettings,
  PaginationRequestModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { MixButtonComponent } from '@mixcore/ui/button';
import { ModalService } from '@mixcore/ui/modal';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { CMS_ROUTES } from '../../../app.routes';

@Component({
  selector: 'mix-app-settings',
  standalone: true,
  imports: [CommonModule, MixButtonComponent, TuiPaginationModule],
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent extends BaseComponent {
  router = inject(Router);
  toast = inject(HotToastService);
  modal = inject(ModalService);
  mixApi = inject(MixApiFacadeService);
  query = signal<PaginationRequestModel>({
    pageIndex: 0,
    pageSize: 10,
  });

  result = signal<PaginationResultModel<MixSettings>>({
    items: [],
    pagingData: {
      pageSize: 10,
      pageIndex: 0,
    },
  });

  constructor() {
    super();

    effect(
      () => {
        this.loadData(this.query());
      },
      { allowSignalWrites: true }
    );
  }

  loadData(query: PaginationRequestModel) {
    this.mixApi.appSettingApi.gets(query, false).subscribe({
      next: (value) => {
        this.result.set(value);
      },
    });
  }

  async addNew() {
    await this.router.navigateByUrl(
      CMS_ROUTES.portal.settings.fullPath + '/create'
    );
  }

  async update(id: number) {
    await this.router.navigateByUrl(
      CMS_ROUTES.portal.settings.fullPath + `/${id}`
    );
  }

  delete(id: number) {
    this.modal.warning('Are you sure to delete this data?').subscribe((ok) => {
      if (ok) {
        this.mixApi.appSettingApi
          .deleteById(id)
          .pipe(
            this.toast.observe({
              success: 'Successfully delete config',
              error: 'Something wrong, please try again',
            })
          )
          .subscribe(() => {
            this.loadData(this.query());
          });
      }
    });
  }

  clearCache(id: number) {
    this.mixApi.appSettingApi
      .removeCache(id)
      .pipe(
        this.toast.observe({
          success: 'Successfully clear cache',
        })
      )
      .subscribe();
  }
}
