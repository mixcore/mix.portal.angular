import { Injectable, inject } from '@angular/core';
import {
  MixFilter,
  MixTaskNew,
  PaginationRequestModel,
  TaskStatus,
} from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { ObjectUtil } from '@mixcore/share/form';
import * as R from 'remeda';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { TaskManageStore } from './task-ui.store';

@Injectable({ providedIn: 'root' })
export class TaskStore extends BaseCRUDStore<MixTaskNew> {
  public taskUiStore = inject(TaskManageStore);

  public override vm$ = combineLatest([
    this.request$$,
    this.taskUiStore.selectedProjectId$,
  ]).pipe(
    tap(([request, projectId]) => {
      request['projectId'] = projectId;
      request.queries = <MixFilter[]>[
        {
          value: projectId,
          fieldName: 'projectId',
          compareOperator: 'Equal',
        },
      ];

      this.loadData(request);
    }),
    switchMap(() => this.select((s) => s))
  );

  public getTaskByStatus = (status: TaskStatus, parentTaskId: number) => {
    return this.select((s) => s).pipe(
      map((s) => {
        return s.data
          .filter(
            (x) => x.taskStatus === status && x.parentTaskId === parentTaskId
          )
          .sort((a, b) => a.priority - b.priority);
      })
    );
  };

  public getParentTasks = () => {
    return this.select((s) => s).pipe(
      map((s) => {
        return s.data
          .filter((x) => !x.parentTaskId)
          .sort((a, b) => a.priority - b.priority);
      })
    );
  };

  public addTask = (task: MixTaskNew, mode: 'Update' | 'Create' = 'Create') => {
    const currentData = this.get().data;
    if (mode === 'Create') {
      currentData.unshift(task);
    } else {
      const taskIndex = currentData.findIndex((x) => x.id === task.id);
      if (taskIndex >= 0) currentData[taskIndex] = task;
    }

    this.patchState({ data: R.clone(currentData) });
  };

  // Static overide
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.databaseApi.getDataByName<MixTaskNew>('mixDb_mixTask', request);

  public override requestName = 'mixTask';
  public override searchColumns = ['Title', 'Description'];
  public override searchColumnsDict: { [key: string]: string } = {
    Title: 'title',
    Description: 'description',
  };
  public override buildCacheKey(request: PaginationRequestModel): string {
    return `${this.requestName}-${ObjectUtil.objectToQueryString(request)}`;
  }
}
