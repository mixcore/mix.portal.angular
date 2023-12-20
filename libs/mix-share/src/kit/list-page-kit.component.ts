import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MixContentStatus } from '@mixcore/lib/model';
import { TableContextMenu } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiDestroyService } from '@taiga-ui/cdk';

export interface ListPageKitConfig<T> {
  contextMenu: TableContextMenu<T>[];
  searchOptions: string[];
  filterOptions?: MixContentStatus[];
  detailUrl: string;
}

@Directive()
export class ListPageKit<T> {
  router = inject(Router);
  destroy$ = inject(TuiDestroyService);
  toast = inject(HotToastService);

  public selectedItems: T[] = [];
  public detailUrl = '';
  public showFilter = false;
  public forceLoading = false;
  public contextMenus: TableContextMenu<T>[] = [];
  public searchOptions = ['code', 'type'];
  public filterOptions: MixContentStatus[] = [
    MixContentStatus.Draft,
    MixContentStatus.Published,
    MixContentStatus.Preview,
    MixContentStatus.Deleted,
  ];

  constructor(public configuration: ListPageKitConfig<T>) {
    this.contextMenus = configuration.contextMenu ?? [];
    this.searchOptions = configuration.searchOptions ?? [];
    this.filterOptions = configuration.filterOptions ?? this.filterOptions;
    this.detailUrl = configuration.detailUrl;
  }

  goDetail(id: number) {
    this.router.navigateByUrl(`${this.detailUrl}/${id}`);
  }

  public onItemSelectedChange(items: T[]) {
    this.selectedItems = items;
  }
}
