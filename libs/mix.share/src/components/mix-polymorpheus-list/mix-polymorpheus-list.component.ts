import { Component, Input, OnInit } from '@angular/core';
import { MixContentType, MixPagePortalModel, MixPostPortalModel, PaginationRequestModel, PaginationResultModel } from '@mix-spa/mix.lib';
import { Observable, tap } from 'rxjs';

import { MixPageApiService } from '../../services/api/mix-page-api.service';
import { MixPostApiService } from '../../services/api/mix-post-api.service';
import { ShareModule } from '../../share.module';
import { MixDataTableModule } from '../data-table/data-table.module';
import { MixToolbarComponent } from '../mix-toolbar/mix-toolbar.component';
import { WorkspaceDynamicComponent } from '../workspace-dynamic-layout';

export type PolymorphousListResult = MixPagePortalModel | MixPostPortalModel;

@Component({
  selector: 'mix-polymorphous-list',
  templateUrl: './mix-polymorpheus-list.component.html',
  styleUrls: ['./mix-polymorpheus-list.component.scss'],
  standalone: true,
  imports: [ShareModule, WorkspaceDynamicComponent, MixDataTableModule, MixToolbarComponent]
})
export class MixPolymorphousListComponent implements OnInit {
  @Input() public listType: MixContentType = MixContentType.Page;
  @Input() public request!: (query: PaginationRequestModel) => Observable<PaginationResultModel<PolymorphousListResult>>;

  public pageCount = 0;
  public currentSelectedItems: PolymorphousListResult[] = [];

  constructor(public pageApi: MixPageApiService, public postApi: MixPostApiService) {}

  public ngOnInit(): void {
    switch (this.listType) {
      case MixContentType.Page:
        this.request = (query: PaginationRequestModel) => this.pageApi.getPages(query);
        break;
      case MixContentType.Post:
        this.request = (query: PaginationRequestModel) => this.postApi.getPosts(query);
        break;
      default:
        this.request = (query: PaginationRequestModel) => this.pageApi.getPages(query);
        break;
    }
  }

  public fetchDataFn = (query: PaginationRequestModel) => {
    return this.request(query).pipe(
      tap(result => {
        this.pageCount = result.pagingData.total || 0;
      })
    );
  };

  public itemSelectedChange(items: PolymorphousListResult[]): void {
    this.currentSelectedItems = items;
  }
}
