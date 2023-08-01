import { MixPost } from '@mixcore/lib/model';
import { Observable, forkJoin } from 'rxjs';
import { MixRestfulApi } from './mix-crud-api.service';

export class MixPostApi extends MixRestfulApi<MixPost> {
  public multiClearCache(postIds: number[]): Observable<void[]> {
    const requests = postIds.map((id) => this.removeCache(id));

    return forkJoin(requests);
  }
}
