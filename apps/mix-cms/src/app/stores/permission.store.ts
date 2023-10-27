import { Injectable } from '@angular/core';
import { MixPermission, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class PermissionsStore extends BaseCRUDStore<MixPermission> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.permissionApi.gets({ ...request });

  //   public override mainUrl = '/' + CMS_ROUTES.portal.permission.fullPath;
  public override requestName = 'permissions';
}
