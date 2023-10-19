import { Injectable } from '@angular/core';
import { MixDatabase, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class DatabaseStore extends BaseCRUDStore<MixDatabase> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.gets({ ...request, columns: '', pageSize: 50 });

  public override requestName = 'database';

  public override searchColumns = ['Name', 'Description'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'displayName',
    Description: 'description',
    Status: 'status',
  };
}
