import { Injectable } from '@angular/core';
import { MixScheduler, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { tapResponse } from '@ngrx/component-store';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SchedulerStore extends BaseCRUDStore<MixScheduler> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.schedulerApi.gets({ ...request, loadNestedData: true });

  public override requestName = 'schedulers';
  public override searchColumns = ['Name'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'name',
  };

  public override loadData = this.effect(
    (request$: Observable<PaginationRequestModel>) =>
      request$.pipe(
        switchMap((request) => {
          this.cacheKey = this.buildCacheKey(request);
          if (!this.cacheService.has(this.cacheKey)) {
            this.patchState({ status: 'Loading' });
          }

          return of(request);
        }),
        switchMap((request) => this.silentFetchData(request)),
        tapResponse(
          (result) => {
            this.cacheService.delete(this.cacheKey);
            this.cacheService.set(this.cacheKey, result);

            this.patchState({
              data: result as unknown as MixScheduler[],
            });
          },
          () => this.patchState({ status: 'Error' })
        )
      )
  );
}
