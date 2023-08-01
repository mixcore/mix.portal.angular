import { Injectable } from '@angular/core';
import { MixModule, PaginationRequestModel } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../app.routes';
import { BaseCRUDStore } from './base-crud.store';

@Injectable()
export class ModuleStore extends BaseCRUDStore<MixModule> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.moduleApi.gets({
      ...request,
      columns: 'image,title,createdDateTime,createdBy,status,priority',
    });

  public override mainUrl = '/' + CMS_ROUTES.portal.module.fullPath;
  public override requestName = 'modules';
}
