import { Component, Inject, OnDestroy } from '@angular/core';
import { TUI_TREE_CONTROLLER, TuiTreeController, TuiTreeItemContentComponent, TuiTreeItemContext } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

import { SidebarMenuService } from '../sidebar-menu.service';

@Component({
  selector: 'mix-menu-item',
  template: `
    <div class="mix-menu-item">
      <ng-container *ngTemplateOutlet="context.template"></ng-container>
      <tui-svg
        *ngIf="sbS.isExpanded$ | async"
        class="mix-menu-item__expand-icon"
        [ngClass]="{ '--expanded': isExpanded }"
        [src]="icon"
        (click)="onClick()"
      ></tui-svg>
    </div>
  `,
  styleUrls: ['./menu-item.scss']
})
export class MenuItemComponent extends TuiTreeItemContentComponent implements OnDestroy {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) context: TuiTreeItemContext,
    @Inject(TUI_TREE_CONTROLLER) controller: TuiTreeController,
    public sbS: SidebarMenuService
  ) {
    super(context, controller);
    this.sbS.isExpanded$.subscribe(isExpanded => {
      if (!isExpanded && this.isExpanded) {
        this.onClick();
      }
    });
  }

  get icon(): string {
    return this.isExpandable ? 'tuiIconChevronRight' : '';
  }

  ngOnDestroy() {
    this.sbS.isExpanded$.unsubscribe();
  }
}
