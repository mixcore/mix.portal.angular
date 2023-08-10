import { Injectable } from '@angular/core';
import { MixDatabase, PaginationRequestModel } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../app.routes';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class DatabaseStore extends BaseCRUDStore<MixDatabase> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.gets({ ...request, columns: '', pageSize: 50 });

  public override mainUrl = '/' + CMS_ROUTES.portal.database.fullPath;
  public override requestName = 'database';
}
