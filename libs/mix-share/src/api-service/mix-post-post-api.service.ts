import {
  MixPostPost,
  PaginationRequestModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable } from 'rxjs';
import { IHttpParamObject } from '../bases/base-api.service';
import { MixRestfulApi } from './mix-crud-api.service';

export class MixPostToPostApi extends MixRestfulApi<MixPostPost> {
  public search(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<MixPostPost>> {
    return this.get(
      MixSwagger.content.postToPost + '/search',
      <IHttpParamObject>request
    );
  }
}
