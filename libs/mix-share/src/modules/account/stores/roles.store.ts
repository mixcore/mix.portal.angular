import { Injectable } from '@angular/core';
import { MixRole, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class RolesStore extends BaseCRUDStore<MixRole> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.accountApi.getRoleList({ ...request, loadNestedData: true });

  public override requestName = 'roles';
  public override searchColumns = ['Name'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'name',
  };
}
