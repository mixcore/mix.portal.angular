import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MixContentStatus,
  MixContentType,
  MixModulePortalModel,
  MixPagePortalModel,
  MixPostPortalModel,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { BehaviorSubject, combineLatest, filter, Observable, tap } from 'rxjs';

import {
  AppEvent,
  AppEventService,
  PortalSidebarControlService
} from '../../services';
import { MixModuleApiService } from '../../services/api/mix-module-api.service';
import { MixPageApiService } from '../../services/api/mix-page-api.service';
import { MixPostApiService } from '../../services/api/mix-post-api.service';
import { ShareModule } from '../../share.module';
import { MixDataTableComponent } from '../data-table';
import { MixDataTableModule } from '../data-table/data-table.module';
import { MixChatBoxComponent } from '../mix-chat';
import { MixModuleDetailComponent } from '../mix-module-detail/mix-module-detail.component';
import { MixStatusIndicatorComponent } from '../mix-status-indicator';
import { MixToolbarComponent } from '../mix-toolbar/mix-toolbar.component';
import { ModalService } from '../modal/modal.service';
import { MixUserListHubComponent } from '../user-list-hub/user-list-hub.component';

export type PolymorphousListResult =
  | MixPagePortalModel
  | MixPostPortalModel
  | MixModulePortalModel;

@Component({
  selector: 'mix-polymorphous-list',
  templateUrl: './mix-polymorpheus-list.component.html',
  styleUrls: ['./mix-polymorpheus-list.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    MixDataTableModule,
    MixToolbarComponent,
    MixStatusIndicatorComponent,
    MixChatBoxComponent,
    MixUserListHubComponent,
    MixModuleDetailComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MixPolymorphousListComponent implements OnInit {
  @Input() public listType: MixContentType = MixContentType.Page;
  @Input() public request!: (
    query: PaginationRequestModel
  ) => Observable<PaginationResultModel<PolymorphousListResult>>;
  @Input() public deleteRequest!: (id: number) => Observable<void>;

  @ViewChild(MixDataTableComponent)
  dataTable!: MixDataTableComponent<PolymorphousListResult>;
  @ViewChild('moduleDetail') public moduleDetail!: TemplateRef<unknown>;

  public readonly contentConfig: Record<
    MixContentType,
    { header: string; searchPlaceholder: string }
  > = {
    Page: {
      header: 'Pages Available',
      searchPlaceholder: 'Type your Page name...'
    },
    Post: {
      header: 'Posts Available',
      searchPlaceholder: 'Type your Post name...'
    },
    Module: {
      header: 'Module sAvailable',
      searchPlaceholder: 'Type your Module name...'
    },
    MixDatabase: {
      header: 'MixDatabases Available',
      searchPlaceholder: 'Type your MixDatabase name...'
    },
    Scheduler: {
      header: 'Schedulers Available',
      searchPlaceholder: 'Type your Scheduler name...'
    },
    Tenant: {
      header: 'Tenants Available',
      searchPlaceholder: 'Type your Tenant name...'
    },
    Domain: {
      header: 'Domains Available',
      searchPlaceholder: 'Type your Domain name...'
    },
    Media: {
      header: 'Medias Available',
      searchPlaceholder: 'Type your Media name...'
    },
    Theme: {
      header: 'Themes Available',
      searchPlaceholder: 'Type your Theme name...'
    },
    Language: {
      header: 'Languages Available',
      searchPlaceholder: 'Type your Language name...'
    },
    Localization: {
      header: 'Localizations Available',
      searchPlaceholder: 'Type your Localization name...'
    }
  };

  // Filter By Status
  public readonly statusOption: MixContentStatus[] = [
    MixContentStatus.Draft,
    MixContentStatus.Published,
    MixContentStatus.Deleted,
    MixContentStatus.Preview
  ];
  public statusControl: FormControl = new FormControl(this.statusOption);

  // Sort Option
  public readonly sortOption: string[] = ['Last Updated', 'Priority'];
  public sortOptionControl: FormControl = new FormControl('Last Updated');

  public showLeftSide = true;
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public itemCount = 0;
  public currentSelectedItems: PolymorphousListResult[] = [];
  public currentActionItem: PolymorphousListResult | undefined = undefined;
  public moduleId = 0;

  constructor(
    @Inject(ModalService) private readonly modalService: ModalService,
    public pageApi: MixPageApiService,
    public postApi: MixPostApiService,
    public moduleApi: MixModuleApiService,
    private appEvent: AppEventService,
    private sidebarControl: PortalSidebarControlService
  ) {}

  public ngOnInit(): void {
    switch (this.listType) {
      case MixContentType.Page:
        this.request = (query: PaginationRequestModel) =>
          this.pageApi.getPages(query);
        this.deleteRequest = (id: number) => this.pageApi.deletePages(id);
        break;
      case MixContentType.Post:
        this.request = (query: PaginationRequestModel) =>
          this.postApi.getPosts(query);
        this.deleteRequest = (id: number) => this.postApi.deletePosts(id);
        break;
      default:
        this.request = (query: PaginationRequestModel) =>
          this.moduleApi.getModules(query);
        this.deleteRequest = (id: number) => this.moduleApi.deleteModules(id);
        break;
    }

    this.appEvent.event$
      .pipe(
        filter(event =>
          [
            AppEvent.NewModuleAdded,
            AppEvent.NewPageAdded,
            AppEvent.NewPostAdded
          ].includes(event)
        )
      )
      .subscribe(() => {
        this.dataTable.reloadData();
      });
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
    const message =
      'Are you sure to delete this items ? Your data may not be revert';
    this.modalService.confirm(message).subscribe((ok: boolean) => {
      if (ok) this.deleteItem();
    });
  }

  public deleteItem(): void {
    this.loading$.next(true);
    combineLatest(
      this.currentSelectedItems.map(v => this.deleteRequest(v.id))
    ).subscribe(() => {
      this.modalService.success('Successfully delete data').subscribe();
      this.dataTable.reloadData();
      this.currentSelectedItems = [];
    });
  }

  public toggleFilter(): void {
    this.showLeftSide = !this.showLeftSide;
  }

  public editItem(): void {
    if (!this.currentActionItem) return;

    switch (this.listType) {
      case MixContentType.Module:
        this.moduleId = this.currentActionItem.id;
        this.sidebarControl.show(this.moduleDetail);
        break;
      default:
        break;
    }
  }
}
