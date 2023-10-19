import { Injectable } from '@angular/core';
import { MixApplication, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class ApplicationStore extends BaseCRUDStore<MixApplication> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.applicationApi.gets({ ...request, columns: '', pageSize: 30 });

  public override requestName = 'application';
  public override searchColumns = [];
  public override searchColumnsDict: { [key: string]: string } = {};
}
