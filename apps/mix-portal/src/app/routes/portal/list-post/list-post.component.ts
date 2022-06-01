import { Component } from '@angular/core';
import { MixPostPortalModel, PaginationRequestModel } from '@mix-spa/mix.lib';
import { HeaderMenuService, MixDataTableModule, MixPostApiService, ShareModule, WorkspaceDynamicComponent } from '@mix-spa/mix.share';
import { tap } from 'rxjs';

@Component({
  selector: 'mix-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  standalone: true,
  imports: [ShareModule, WorkspaceDynamicComponent, MixDataTableModule]
})
export class ListPostComponent {
  public postCount = 0;
  public currentSelectedItems: MixPostPortalModel[] = [];

  constructor(public postApiService: MixPostApiService, private headerService: HeaderMenuService) {
    this.headerService.setTitle('Available Posts');
  }

  public fetchPostFn = (request: PaginationRequestModel) =>
    this.postApiService.getPost(request).pipe(
      tap(result => {
        this.postCount = result.pagingData.total || 0;
      })
    );

  public itemSelectedChange(items: MixPostPortalModel[]): void {
    this.currentSelectedItems = items;
  }
}
