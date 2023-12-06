import { Injectable, inject } from '@angular/core';
import { DbContextFixId, MixDatabase } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseState } from '@mixcore/share/base';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs';

export class MasterDbState {
  public masterDbMap: Record<number, BaseState<MixDatabase> | undefined> = {};
  public selectedContextId?: number;
  public selectedContext?: BaseState<MixDatabase>;
}

@Injectable({ providedIn: 'root' })
export class MasterDbStore extends ComponentStore<MasterDbState> {
  public mixApi = inject(MixApiFacadeService);
  public vm$ = this.select((s) => s);
  public selectedContext = this.selectSignal((s) => s.selectedContext);

  public selectedDbChange(dbContextId: number) {
    this.loadData(dbContextId);
  }

  public getDbByContext(dbContextId: number) {
    return this.select((s) => s.masterDbMap).pipe(
      map((map) => map[dbContextId])
    );
  }

  public loadData(dbContextId: number) {
    const request = {
      pageIndex: 0,
      pageSize: 50,
      mixDatabaseContextId:
        dbContextId === DbContextFixId.MasterDb ? undefined : dbContextId,
    };

    const current = this.get().masterDbMap;
    if (!current[dbContextId]) {
      current[dbContextId] = {
        data: [],
        status: 'Loading',
        request: request,
        pageInfo: { pageSize: 50, pageIndex: 0 },
      };
    } else {
      current[dbContextId]!.status = 'SilentLoading';
    }

    this.patchState({
      masterDbMap: current,
      selectedContextId: dbContextId,
      selectedContext: current[dbContextId],
    });

    this.mixApi.databaseApi.gets(request).subscribe({
      next: (result) => {
        const dbMap = this.get().masterDbMap;
        dbMap[dbContextId] = {
          status: 'Success',
          data: result.items,
          pageInfo: result.pagingData,
          request: request,
        };

        this.patchState({
          masterDbMap: dbMap,
          selectedContext: current[dbContextId],
        });
      },
      error: (err) => {
        //
      },
    });
  }

  constructor() {
    super({
      masterDbMap: {},
    });
  }
}
