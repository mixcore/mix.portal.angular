import {
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

import { CollapseButtonComponent } from '../collapse-button/collapse-button.component';
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

  @ViewChildren(CollapseButtonComponent)
  public menuItems: QueryList<CollapseButtonComponent>;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.renderer.listen('window', 'click', (e: MouseEvent) => {
      const currentW = this.el.nativeElement.offsetWidth;
      if (e.screenX > currentW) {
        this.activeItemIndex = -1;
      }
    });
  }

  public onCollapseSidebar(): void {
    this.expanded = !this.expanded;
  }

  public onCollapseAllMenuItem(): void {
    Array.from(this.menuItems).forEach((item) => {
      item.expanded = false;
    });
  }

  public activeItem(index: number): void {
    this.activeItemIndex = index;
  }
}
