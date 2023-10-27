import { Injectable } from '@angular/core';
import { MixPost, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class PostStore extends BaseCRUDStore<MixPost> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.postApi.filter({
      ...request,
      columns: 'image,title,createdDateTime,createdBy,status,priority,seoName',
    });

  public override requestName = 'posts';
  public override searchColumns = ['Name'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'title',
  };
}
