import { Injectable } from '@angular/core';
import { MixRole, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class RolesStore extends BaseCRUDStore<MixRole> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.accountApi.getRoleList({ ...request, loadNestedData: true });

  //   public override mainUrl = '/' + CMS_ROUTES.portal.roles.fullPath;
  public override requestName = 'roles';
}
