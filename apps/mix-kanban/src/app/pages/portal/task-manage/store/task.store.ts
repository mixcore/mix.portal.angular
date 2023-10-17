import { Injectable } from '@angular/core';
import {
  MixTaskNew,
  PaginationRequestModel,
  TaskStatus,
} from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { map } from 'rxjs';
import { MixSystemDbName } from '../../../../shares/consts/system-database-name';

@Injectable({ providedIn: 'root' })
export class TaskStore extends BaseCRUDStore<MixTaskNew> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.getDataByName<MixTaskNew>(MixSystemDbName.Task, {
      ...request,
    });

  public override requestName = 'mixTask';
  public override searchColumns = ['Title', 'Description'];
  public override searchColumnsDict: { [key: string]: string } = {
    Title: 'title',
    Description: 'description',
  };

  public getTaskByStatus = (status: TaskStatus) => {
    return this.select((s) => s).pipe(
      map((s) => {
        return s.data
          .filter((x) => x.taskStatus === status)
          .sort((a, b) => a.priority - b.priority);
      })
    );
  };

  public addTask = (task: MixTaskNew, mode: 'Update' | 'Create' = 'Create') => {
    this.patchState((s) => {
      if (mode === 'Create') return { ...s, data: [task, ...s.data] };

      const taskIndex = s.data.findIndex((x) => x.id === task.id);
      if (taskIndex >= 0) s.data[taskIndex] = task;

      return { ...s };
    });
  };
}
