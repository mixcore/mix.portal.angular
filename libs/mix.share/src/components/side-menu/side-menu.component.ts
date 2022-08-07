import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerticalDisplayPosition } from '@mix-spa/mix.lib';
import { JoyrideModule, JoyrideService } from 'ngx-joyride';

import { AppService } from '../../services/helper/app-setting.service';
import { ShareModule } from '../../share.module';

export interface MixToolbarMenu {
  id: number;
  title: string;
  icon: string;
  hideDetail?: boolean;
  action?: () => void;
  detail: MenuItem[];
  position: VerticalDisplayPosition;
  guideText?: string;
  route?: string;
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
  imports: [ShareModule, JoyrideModule],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ width: 0, opacity: 0 }),
        animate('110ms', style({ width: '200px', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ width: '200px', opacity: 1 }),
        animate('110ms', style({ width: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class SideMenuComponent implements OnInit {
  @Input() public showMenuLevel2 = false;
  @Input() public menuItems: MixToolbarMenu[] = [];
  public currentSelectedItem: MixToolbarMenu | undefined;
  public hideTourGuide = false;
  public expand = false;
  public readonly VerticalDisplayPosition = VerticalDisplayPosition;

  constructor(
    private readonly joyrideService: JoyrideService,
    public appService: AppService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initMenu();
    this.initTourGuide();
  }

  public initMenu(): void {
    const route = this.router.url.split('/')[2];
    this.currentSelectedItem =
      this.menuItems.find(i => i.route && i.route === route) ||
      this.menuItems[1];
    this.expand = true;
  }

  public initTourGuide(): void {
    return;
    this.hideTourGuide = this.appService.appSetting.hideTourGuide;
    if (this.hideTourGuide) return;
    this.joyrideService.startTour({
      steps: this.menuItems
        .filter(i => i.guideText)
        .map((i, index) => `step${index}`)
    });
  }

  public itemSelect(item: MixToolbarMenu): void {
    if (item.action) item.action();
    if (item.hideDetail) return;

    this.currentSelectedItem = item;
    this.expand = true;
  }

  public itemClick(item: MenuItem): void {
    if (item.action) item.action();
  }

  public toggleTourGuide(value: boolean) {
    this.hideTourGuide = value;
    this.appService.toggleTourGuide(value);
  }
}
