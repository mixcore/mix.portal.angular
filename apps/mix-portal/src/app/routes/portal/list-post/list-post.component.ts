import { Component } from '@angular/core';
import { PaginationRequestModel } from '@mix-spa/mix.lib';
import { HeaderMenuService, MixDataTableModule, MixPostApiService, ShareModule, WorkspaceDynamicComponent } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  standalone: true,
  imports: [ShareModule, WorkspaceDynamicComponent, MixDataTableModule]
})
export class ListPostComponent {
  constructor(public postApiService: MixPostApiService, private headerService: HeaderMenuService) {
    this.headerService.setTitle('Available Posts');
  }

  public fetchPostFn = (request: PaginationRequestModel) => this.postApiService.getPost(request);
}
