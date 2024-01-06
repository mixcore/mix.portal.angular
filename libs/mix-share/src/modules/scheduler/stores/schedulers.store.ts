import { Injectable } from '@angular/core';
import { MixScheduler, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class SchedulerStore extends BaseCRUDStore<MixScheduler> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.schedulerApi.gets({ ...request, loadNestedData: true });

  public override requestName = 'schedulers';
  public override searchColumns = ['Name'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'name',
  };
}
