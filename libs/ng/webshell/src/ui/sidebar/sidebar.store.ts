import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { mergeMap, switchMap, tap } from 'rxjs/operators';

import { IBaseState } from '@coreng/angular-core';
import { ISidebarMenuItem } from './sidebar.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

export const SIDEBAR_TRANS_OBJ_KEY: string = 'sidebar';
export const SMC_SIDEBAR_MENU_ITEMS: ISidebarMenuItem[] = [
  {
    title: 'dashboard',
    routerLink: [''],
    icon: 'pie-chart'
  },
  {
    title: 'document',
    routerLink: ['dashboard', 'news'],
    icon: 'audit',
    children: [
      {
        title: 'gettingStarted'
      },
      {
        title: 'api'
      },
      {
        title: 'aboutUs'
      }
    ]
  },
  {
    title: 'navigation',
    routerLink: ['navigation'],
    icon: 'audit',
    children: [
      {
        title: 'createNew'
      },
      {
        title: 'list'
      }
    ]
  },
  {
    title: 'page',
    icon: 'cluster',
    routerLink: ['page'],
    children: [
      {
        title: 'createNew'
      },
      {
        title: 'list'
      }
    ]
  },
  {
    title: 'post',
    icon: 'cluster',
    routerLink: ['post'],
    children: [
      {
        title: 'createNew'
      },
      {
        title: 'list'
      }
    ]
  },
  {
    title: 'module',
    icon: 'cluster',
    routerLink: ['module'],
    children: [
      {
        title: 'createNew'
      },
      {
        title: 'list'
      }
    ]
  }
];

export interface ISideBarState extends IBaseState<ISidebarMenuItem[]> {
  translateObject: Record<string, string>;
}

@Injectable()
export class SideBarStore extends ComponentStore<ISideBarState> {
  public sidebarTranslateObj$: Observable<Record<string, string>> = this.transService.selectTranslateObject(SIDEBAR_TRANS_OBJ_KEY);

  public menuItems$: Observable<ISidebarMenuItem[]> = this.sidebarTranslateObj$.pipe(
    tap((translateObj: Record<string, string>) => {
      this.patchState({
        translateObject: translateObj
      });
      this.loadMenuItems();
    }),
    switchMap(() => this.select((s: ISideBarState) => s.data))
  );

  public readonly loadMenuItems: () => void = this.effect((param$: Observable<void>) => {
    return param$.pipe(
      tap(() => this.patchState({ status: 'Loading', errors: [] })),
      mergeMap(() =>
        this.sidebarTranslateObj$.pipe(
          tapResponse(
            (translateObj: Record<string, string>) => {
              this.patchState({
                data: this.mapTranslateObject(translateObj),
                status: 'Success',
                errors: []
              });
            },
            () => {
              this.patchState({
                status: 'Error'
              });
            }
          )
        )
      )
    );
  });

  constructor(private transService: TranslocoService) {
    super({} as ISideBarState);
  }

  public mapTranslateObject(translateObj: Record<string, string>): ISidebarMenuItem[] {
    return SMC_SIDEBAR_MENU_ITEMS.map((item: ISidebarMenuItem) => {
      return {
        title: translateObj[item.title || ''],
        icon: item.icon,
        routerLink: item.routerLink,
        disabled: item.disabled
      } as ISidebarMenuItem;
    });
  }
}
