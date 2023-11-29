import { Injectable } from '@angular/core';
import { MixProject } from '@mixcore/lib/model';
import { ComponentStore } from '@ngrx/component-store';
import { filter } from 'rxjs';

export interface TaskManageState {
  selectedProjectId: number | undefined;
}

@Injectable({ providedIn: 'root' })
export class TaskManageStore extends ComponentStore<TaskManageState> {
  public selectedProjectId$ = this.select((s) => s.selectedProjectId).pipe(
    filter(Boolean)
  );

  public changeSelected(project: MixProject) {
    this.patchState({ selectedProjectId: project.id });
  }

  constructor() {
    super({
      selectedProjectId: undefined,
    });
  }
}
