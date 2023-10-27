import { Injectable } from '@angular/core';
import { PaginationRequestModel, UserListVm } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class UserStore extends BaseCRUDStore<UserListVm> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.accountApi.getUserList({ ...request, loadNestedData: true });

  public override requestName = 'users';
}
