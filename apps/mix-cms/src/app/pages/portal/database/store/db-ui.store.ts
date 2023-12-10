import { Injectable } from '@angular/core';
import { MixDbContext } from '@mixcore/lib/model';
import { ComponentStore } from '@ngrx/component-store';
import { filter } from 'rxjs';

export interface DbUiState {
  selectedContextId: number | undefined;
}

@Injectable({ providedIn: 'root' })
export class DbUiStore extends ComponentStore<DbUiState> {
  public selectedContextId$ = this.select((s) => s.selectedContextId).pipe(
    filter(Boolean)
  );

  public changeSelected(context: MixDbContext) {
    this.patchState({ selectedContextId: context.id });
  }

  constructor() {
    super({
      selectedContextId: undefined,
    });
  }
}
