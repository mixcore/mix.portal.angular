import { Injectable } from '@angular/core';
import { MixProject, PaginationRequestModel } from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';

@Injectable({ providedIn: 'root' })
export class ProjectStore extends BaseCRUDStore<MixProject> {
  public project = this.selectSignal((s) => s.data);

  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.getDataByName<MixProject>(
      'mixDb_MixProject',
      request
    );

  public override requestName = 'mixProject';
  public override searchColumns = ['Name', 'Description'];
  public override searchColumnsDict: { [key: string]: string } = {
    Name: 'name',
    Description: 'description',
  };
}
