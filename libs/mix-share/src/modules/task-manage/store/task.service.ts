import { Injectable, inject } from '@angular/core';
import { MixDynamicData, MixTaskNew } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';

@Injectable({ providedIn: 'root' })
export class TaskService {
  public mixApi = inject(MixApiFacadeService);

  public saveTask(task: MixTaskNew) {
    return this.mixApi.databaseApi.saveData(
      'mixDb_mixTask',
      task.id ?? -1,
      task as unknown as MixDynamicData
    );
  }
}
