import { Component } from '@angular/core';
import { MixPagePortalModel, PaginationRequestModel } from '@mix-spa/mix.lib';
import { MixDataTableModule, MixPageApiService, MixToolbarComponent, ShareModule, WorkspaceDynamicComponent } from '@mix-spa/mix.share';
import { tap } from 'rxjs';

@Component({
  selector: 'mix-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  standalone: true,
  imports: [ShareModule, WorkspaceDynamicComponent, MixDataTableModule, MixToolbarComponent]
})
export class ListPageComponent {
  public pageCount = 0;
  public currentSelectedItems: MixPagePortalModel[] = [];

  constructor(public pageApi: MixPageApiService) {}

  public fetchPageFn = (request: PaginationRequestModel) =>
    this.pageApi.getPages(request).pipe(
      tap(result => {
        this.pageCount = result.pagingData.total || 0;
      })
    );

  public itemSelectedChange(items: MixPagePortalModel[]): void {
    this.currentSelectedItems = items;
  }
}
