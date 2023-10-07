import {
  MixRegister,
  MixRole,
  PaginationRequestModel,
  PaginationResultModel,
  UserDetail,
  UserListVm,
} from '@mixcore/lib/model';
import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable } from 'rxjs';
import { BaseApiService, IHttpParamObject } from '../bases';

export class MixAccountApi extends BaseApiService {
  public getUserList(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<UserListVm>> {
    return this.get(MixSwagger.user.list, request as IHttpParamObject);
  }

  public getUserDetail(id: string): Observable<UserDetail> {
    return this.get(MixSwagger.user.detail + '/' + id);
  }

  public getRoleList(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixRole>> {
    return this.get(MixSwagger.user.role, request as IHttpParamObject);
  }

  public getRoleById(id: string): Observable<MixRole> {
    return this.get(`${MixSwagger.user.role}/${id}`);
  }

  public createUser(registerForm: MixRegister) {
    return this.post(MixSwagger.user.register, registerForm);
  }

  public removeUser(userId: string) {
    return this.delete(MixSwagger.user.delete + '/' + userId);
  }
}
