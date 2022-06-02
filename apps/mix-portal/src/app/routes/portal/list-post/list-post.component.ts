import { Component } from '@angular/core';
import { MixPostPortalModel, PaginationRequestModel } from '@mix-spa/mix.lib';
import { MixDataTableModule, MixPostApiService, MixToolbarComponent, ShareModule, WorkspaceDynamicComponent } from '@mix-spa/mix.share';
import { tap } from 'rxjs';

@Component({
  selector: 'mix-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  standalone: true,
  imports: [ShareModule, WorkspaceDynamicComponent, MixDataTableModule, MixToolbarComponent]
})
export class ListPostComponent {
  public postCount = 0;
  public currentSelectedItems: MixPostPortalModel[] = [];

  constructor(public postApiService: MixPostApiService) {}

  public fetchPostFn = (request: PaginationRequestModel) =>
    this.postApiService.getPosts(request).pipe(
      tap(result => {
        this.postCount = result.pagingData.total || 0;
      })
    );

  public itemSelectedChange(items: MixPostPortalModel[]): void {
    this.currentSelectedItems = items;
  }
}
