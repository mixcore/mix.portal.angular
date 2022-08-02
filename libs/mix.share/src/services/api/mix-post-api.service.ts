import { Injectable } from '@angular/core';
import {
  MixApiDict,
  MixPostPortalModel,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { Observable, tap } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';
import { AppEvent } from '../helper/app-event.service';

@Injectable({ providedIn: 'root' })
export class MixPostApiService extends BaseApiService {
  public getDefaultPostTemplate(): Observable<MixPostPortalModel> {
    return this.get(MixApiDict.PostApi.getDefaultPostEndpoint);
  }

  public savePost(data: MixPostPortalModel): Observable<void> {
    return this.post<MixPostPortalModel, void>(
      MixApiDict.PostApi.savePostEndpoint,
      data
    ).pipe(tap(() => this.appEvent.notify(AppEvent.NewPostAdded)));
  }

  public getPosts(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixPostPortalModel>> {
    return this.get<PaginationResultModel<MixPostPortalModel>>(
      MixApiDict.PostApi.getPostEndpoint,
      <IHttpParamObject>request
    );
  }

  public deletePosts(id: number): Observable<void> {
    return this.delete(MixApiDict.PostApi.deletePostEndpoint + id);
  }

  public getPostById(id: number): Observable<MixPostPortalModel> {
    return this.get(MixApiDict.PostApi.getPostByIdEndpoint(id));
  }
}
