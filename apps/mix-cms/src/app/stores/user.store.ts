import { Injectable } from '@angular/core';
import { PaginationRequestModel, UserListVm } from '@mixcore/lib/model';
import { forkJoin, of, switchMap } from 'rxjs';
import { CMS_ROUTES } from '../app.routes';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class UserStore extends BaseCRUDStore<UserListVm> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.accountApi
      .getUserList({ ...request, loadNestedData: true })
      .pipe(
        switchMap((result) => {
          const requests = result.items.map((item) =>
            this.mixApi.accountApi.getUserDetail(item.id)
          );

          return forkJoin(requests).pipe(
            switchMap((userDatas) => {
              result.items = result.items.map((item) =>
                new UserListVm(item).withUserData(
                  userDatas.find((data) => data.id === item.id)
                )
              );

              return of(result);
            })
          );
        })
      );

  public override mainUrl = '/' + CMS_ROUTES.portal.user.fullPath;
  public override requestName = 'users';
}
