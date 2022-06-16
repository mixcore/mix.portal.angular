import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { VerticalDisplayPosition } from '@mix-spa/mix.lib';

import { ShareModule } from '../../share.module';

export interface MixToolbarMenu {
  id: number;
  title: string;
  icon: string;
  hideDetail?: boolean;
  action?: () => void;
  detail: MenuItem[];
  position: VerticalDisplayPosition;
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
      transition(':enter', [style({ width: 0, opacity: 0 }), animate('110ms', style({ width: '200px', opacity: 1 }))]),
      transition(':leave', [style({ width: '200px', opacity: 1 }), animate('110ms', style({ width: 0, opacity: 0 }))])
    ])
  ]
})
export class SideMenuComponent implements OnInit {
  @Input() public showMenuLevel2 = false;
  @Input() public menuItems: MixToolbarMenu[] = [];
  public currentSelectedItem: MixToolbarMenu | undefined;
  public readonly VerticalDisplayPosition = VerticalDisplayPosition;

  public ngOnInit(): void {
    this.currentSelectedItem = this.menuItems[1];
  }

  public itemSelect(item: MixToolbarMenu): void {
    if (item.action) item.action();
    if (item.hideDetail) return;

    this.currentSelectedItem = item;
  }

  public itemClick(item: MenuItem): void {
    if (item.action) {
      return item.action();
    }
  }
}
