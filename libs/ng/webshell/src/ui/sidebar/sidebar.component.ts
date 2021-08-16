import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { SideBarStore } from './sidebar.store';

export interface ISidebarMenuItem {
  title?: string;
  icon?: string;
  action?: () => void;
  children?: ISidebarMenuItem[];
  disabled?: boolean;
  routerLink?: string | string[];
}

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SideBarStore]
})
export class HulkSidebarComponent {
  @Output() public expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isExpanded: boolean = true;

  constructor(public store: SideBarStore) {}

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
    this.expandedChanged.emit(this.isExpanded);
  }

  public handleClick(item: ISidebarMenuItem): void {
    if (!item.action) {
      return;
    }

    item.action();
  }
}
