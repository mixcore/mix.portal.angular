import { Injectable } from '@angular/core';
import { MixPage, PaginationRequestModel } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../app.routes';
import { BaseCRUDStore } from './base-crud.store';

@Injectable()
export class PageStore extends BaseCRUDStore<MixPage> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.pageApi.gets({
      ...request,
      columns: 'title,priority,status,image,createdDateTime,createdBy',
    });

  public override mainUrl = '/' + CMS_ROUTES.portal.page.fullPath;
  public override requestName = 'page';
}