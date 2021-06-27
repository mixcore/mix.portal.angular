import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HulkSidebarComponent {
  @Input() public menuItems: ISidebarMenuItem[] = [];
  @Output() public expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isExpanded: boolean = true;

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
