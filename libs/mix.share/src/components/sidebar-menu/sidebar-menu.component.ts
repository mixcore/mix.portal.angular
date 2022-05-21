import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY_ARRAY, TuiHandler } from '@taiga-ui/cdk';
import { TUI_TREE_CONTENT } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { MenuItemComponent } from './menu-item/menu-item';
import { SidebarMenuService } from './sidebar-menu.service';

interface TreeNode {
  readonly text: string;
  readonly icon?: string;
  readonly action?: () => void;
  readonly children?: readonly TreeNode[];
}

@Component({
  selector: 'mix-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  providers: [
    SidebarMenuService,
    {
      provide: TUI_TREE_CONTENT,
      useValue: new PolymorpheusComponent(MenuItemComponent)
    }
  ]
})
export class SidebarMenuComponent {
  public isExpanded = true;
  public treeMap = new Map<TreeNode, boolean>();
  public data: TreeNode = {
    text: 'Mix Menu Item',
    children: [
      {
        text: 'DashBoard',
        icon: 'tuiIconStructureLarge',
        action: () => {
          this.route.navigateByUrl('/portal/dashboard');
        },
        children: [
          {
            text: 'News',
            children: [{ text: 'Next level 1' }, { text: 'Next level 2' }, { text: 'Next level 3' }]
          }
        ]
      },
      {
        text: 'Posts',
        icon: 'tuiIconAddRowLarge',
        action: () => {
          this.route.navigateByUrl('/portal/list-post');
        }
      },
      {
        text: 'Pages',
        icon: 'tuiIconFileLarge',
        children: [{ text: 'Create Page' }, { text: 'List Page' }],
        action: () => {
          //
        }
      }
    ]
  };

  constructor(public sidebarService: SidebarMenuService, public route: Router) {
    this.sidebarService.isExpanded$.subscribe(ok => (this.isExpanded = ok));
  }

  public get collapseIcon(): string {
    return 'tuiIconChevronLeftLarge';
  }

  public handler: TuiHandler<TreeNode, readonly TreeNode[]> = item => item.children || EMPTY_ARRAY;

  public toggleMenu(): void {
    const isExpanded = this.sidebarService.isExpanded$.getValue();
    this.sidebarService.isExpanded$.next(!isExpanded);
  }

  public menuItemIconClick(node: TreeNode): void {
    if (this.isExpanded) {
      return;
    }

    this.sidebarService.isExpanded$.next(true);
    setTimeout(() => {
      this.treeMap.set(node, !this.treeMap.get(node));
    }, 300);
  }
}
