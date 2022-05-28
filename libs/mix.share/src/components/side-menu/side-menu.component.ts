import { Component, Input } from '@angular/core';

import { ShareModule } from '../../share.module';

export interface MixToolbarMenu {
  id: number;
  title: string;
  icon: string;
  detail: MenuItem[];
}

export interface MenuItem {
  icon: string;
  title: string;
  route?: string | string[];
  action?: () => void;
}

@Component({
  selector: 'mix-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class SideMenuComponent {
  @Input() public showMenuLevel2 = false;
  @Input() public menuItems: MixToolbarMenu[] = [];
  public currentSelectedItem: MixToolbarMenu | undefined;

  public itemSelect(item: MixToolbarMenu): void {
    this.currentSelectedItem = item;
  }
}
