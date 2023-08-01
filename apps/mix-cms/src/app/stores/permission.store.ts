import { Injectable } from '@angular/core';
import { MixPermission, PaginationRequestModel } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../app.routes';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class PermissionsStore extends BaseCRUDStore<MixPermission> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.permissionApi.gets({ ...request });

  public override mainUrl = '/' + CMS_ROUTES.portal.permission.fullPath;
  public override requestName = 'permissions';
}
