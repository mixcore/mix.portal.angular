import { MixScheduler } from '@mixcore/lib/model';
import { Observable } from 'rxjs';
import { MixRestfulApi } from './mix-crud-api.service';

export class MixSchedulerApi extends MixRestfulApi<MixScheduler> {
  public create(value: MixScheduler): Observable<MixScheduler> {
    return this.post<MixScheduler, MixScheduler>(
      `${this.restUrl}/create`,
      value,
      undefined,
      undefined,
      this.resultHandler
    );
  }
}
