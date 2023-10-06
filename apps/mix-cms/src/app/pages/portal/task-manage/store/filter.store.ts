import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface TaskFilterState {
  userIds: string[];
  isOnlyMyIssue: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskFilterStore extends ComponentStore<TaskFilterState> {
  public userIds$ = this.select((s) => s);

  public toggleUserIds(userId: string) {
    this.patchState((s) => {
      let current = s.userIds;
      if (current.includes(userId)) {
        current = current.filter((id) => id !== userId);
      } else {
        current.push(userId);
      }

      return { ...s, userIds: current };
    });
  }

  constructor() {
    super({
      userIds: [],
      isOnlyMyIssue: false,
    });
  }
}
