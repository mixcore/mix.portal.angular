import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MixContentType, MixPagePortalModel, MixPostPortalModel, PaginationRequestModel, PaginationResultModel } from '@mix-spa/mix.lib';
import { BehaviorSubject, combineLatest, Observable, tap } from 'rxjs';

import { MixModuleApiService } from '../../services/api/mix-module-api.service';
import { MixPageApiService } from '../../services/api/mix-page-api.service';
import { MixPostApiService } from '../../services/api/mix-post-api.service';
import { ShareModule } from '../../share.module';
import { MixDataTableComponent } from '../data-table';
import { MixDataTableModule } from '../data-table/data-table.module';
import { MixStatusIndicatorComponent } from '../mix-status-indicator';
import { MixToolbarComponent } from '../mix-toolbar/mix-toolbar.component';
import { ModalService } from '../modal/modal.service';
import { WorkspaceDynamicComponent } from '../workspace-dynamic-layout';

export type PolymorphousListResult = MixPagePortalModel | MixPostPortalModel;

@Component({
  selector: 'mix-polymorphous-list',
  templateUrl: './mix-polymorpheus-list.component.html',
  styleUrls: ['./mix-polymorpheus-list.component.scss'],
  standalone: true,
  imports: [ShareModule, WorkspaceDynamicComponent, MixDataTableModule, MixToolbarComponent, MixStatusIndicatorComponent]
})
export class MixPolymorphousListComponent implements OnInit {
  @Input() public listType: MixContentType = MixContentType.Page;
  @Input() public request!: (query: PaginationRequestModel) => Observable<PaginationResultModel<PolymorphousListResult>>;
  @Input() public deleteRequest!: (id: number) => Observable<void>;

  @ViewChild(MixDataTableComponent) dataTable!: MixDataTableComponent<PolymorphousListResult>;

  public readonly contentConfig: Record<MixContentType, { header: string; searchPlaceholder: string }> = {
    Page: { header: 'Page Available', searchPlaceholder: 'Type your Page name...' },
    Post: { header: 'Post Available', searchPlaceholder: 'Type your Post name...' },
    Module: { header: 'Module Available', searchPlaceholder: 'Type your Module name...' },
    MixDatabase: { header: 'MixDatabase Available', searchPlaceholder: 'Type your MixDatabase name...' },
    Scheduler: { header: 'Scheduler Available', searchPlaceholder: 'Type your Scheduler name...' },
    Tenant: { header: 'Tenant Available', searchPlaceholder: 'Type your Tenant name...' },
    Domain: { header: 'Domain Available', searchPlaceholder: 'Type your Domain name...' },
    Media: { header: 'Media Available', searchPlaceholder: 'Type your Media name...' },
    Theme: { header: 'Theme Available', searchPlaceholder: 'Type your Theme name...' },
    Language: { header: 'Language Available', searchPlaceholder: 'Type your Language name...' },
    Localization: { header: 'Localization Available', searchPlaceholder: 'Type your Localization name...' }
  };

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public itemCount = 0;
  public currentSelectedItems: PolymorphousListResult[] = [];

  constructor(
    @Inject(ModalService) private readonly modalService: ModalService,
    public pageApi: MixPageApiService,
    public postApi: MixPostApiService,
    public moduleApi: MixModuleApiService
  ) {}

  public ngOnInit(): void {
    switch (this.listType) {
      case MixContentType.Page:
        this.request = (query: PaginationRequestModel) => this.pageApi.getPages(query);
        this.deleteRequest = (id: number) => this.pageApi.deletePages(id);
        break;
      case MixContentType.Post:
        this.request = (query: PaginationRequestModel) => this.postApi.getPosts(query);
        this.deleteRequest = (id: number) => this.postApi.deletePosts(id);
        break;
      default:
        this.request = (query: PaginationRequestModel) => this.moduleApi.getModules(query);
        this.deleteRequest = (id: number) => this.moduleApi.deleteModules(id);
        break;
    }
  }

  public fetchDataFn = (query: PaginationRequestModel) => {
    return this.request(query).pipe(
      tap(result => {
        this.itemCount = result.pagingData.total || 0;
      })
    );
  };

  public itemSelectedChange(items: PolymorphousListResult[]): void {
    this.currentSelectedItems = items;
  }

  public onDelete(): void {
    const message = 'Are you sure to delete this items ? Your data may not be revert';
    this.modalService.confirm(message).subscribe((ok: boolean) => {
      if (ok) this.deleteItem();
    });
  }

  public deleteItem(): void {
    this.loading$.next(true);
    combineLatest(this.currentSelectedItems.map(v => this.deleteRequest(v.id))).subscribe(() => {
      this.modalService.success('Successfully delete data').subscribe();
      this.dataTable.reloadData();
    });
  }
}
