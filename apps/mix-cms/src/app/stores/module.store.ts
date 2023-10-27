import { Injectable } from '@angular/core';
import { MixModule, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class ModuleStore extends BaseCRUDStore<MixModule> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.moduleApi.gets({
      ...request,
      columns: 'image,title,createdDateTime,createdBy,status,priority',
    });

  public override requestName = 'modules';
}
