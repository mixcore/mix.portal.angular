import { animate, style, transition, trigger } from '@angular/animations';
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
  imports: [ShareModule],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [style({ width: 0, opacity: 0 }), animate('200ms', style({ width: '200px', opacity: 1 }))]),
      transition(':leave', [style({ width: '200px', opacity: 1 }), animate('200ms', style({ width: 0, opacity: 0 }))])
    ])
  ]
})
export class SideMenuComponent {
  @Input() public showMenuLevel2 = false;
  @Input() public menuItems: MixToolbarMenu[] = [];
  public currentSelectedItem: MixToolbarMenu | undefined;

  public itemSelect(item: MixToolbarMenu): void {
    this.currentSelectedItem = item;
  }

  public itemClick(item: MenuItem): void {
    if (item.action) {
      return item.action();
    }
  }
}
