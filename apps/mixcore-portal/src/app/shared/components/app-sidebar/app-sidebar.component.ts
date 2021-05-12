import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/sidebar-item.model';

@Component({
  selector: 'mix-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
})
export class AppSidebarComponent {
  @Input() public items: MenuItem[] = [];
  public activeItemIndex: number = -1;
  public expanded: boolean = true;

  public onCollapseSidebar(): void {
    this.expanded = !this.expanded;
  }

  public activeItem(index: number): void {
    this.activeItemIndex = index;
  }
}
