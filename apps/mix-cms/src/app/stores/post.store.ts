import { Injectable } from '@angular/core';
import { MixPost, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class PostStore extends BaseCRUDStore<MixPost> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.postApi.filter({
      ...request,
      columns: 'image,title,createdDateTime,createdBy,status,priority,seoName',
    });

  //   public override mainUrl = '/' + CMS_ROUTES.portal.post.fullPath;
  public override requestName = 'posts';

  public override searchColumns = ['Name'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'title',
  };
}
