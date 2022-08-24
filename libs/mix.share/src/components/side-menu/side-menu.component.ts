import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { VerticalDisplayPosition } from '@mix-spa/mix.lib';
import { JoyrideModule, JoyrideService } from 'ngx-joyride';

import { RouteConfig } from '../../routes/routes.const';
import { AppEventService } from '../../services';
import { AppService } from '../../services/helper/app-setting.service';
import { ShareModule } from '../../share.module';
import { ContentMenuComponent } from './content-menu/content-menu.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { SettingMenuComponent } from './setting-menu/setting-menu.component';
import { SideMenuService } from './side-menu.service';
import { SideMenuButtonComponent } from './side-menu-button/side-menu-button.component';
import { TemplateMenuComponent } from './template-menu/template-menu.component';

export interface MixToolbarMenu {
  id: number | string;
  title: string;
  icon: string;
  hideDetail?: boolean;
  action?: () => void;
  detail: MenuItem[];
  position: VerticalDisplayPosition;
  guideText?: string;
  route?: string | string[];
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
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ShareModule,
    JoyrideModule,
    DashboardMenuComponent,
    ContentMenuComponent,
    TemplateMenuComponent,
    SettingMenuComponent,
    SideMenuButtonComponent
  ]
})
export class SideMenuComponent implements OnInit {
  @Input() public showMenuLevel2 = false;
  @Output() public expandChange: EventEmitter<boolean> = new EventEmitter();
  public currentSelectedItem: MixToolbarMenu | undefined;
  public isShowMenu = true;
  public isMiniGroupBar = false;
  public open = false;

  public groups: MixToolbarMenu[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'device-desktop-analytics',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [RouteConfig.PortalDashboard]
    },
    {
      id: 'content',
      title: 'Contents',
      icon: 'file-text',
      position: VerticalDisplayPosition.Top,
      detail: [],
      route: [
        RouteConfig.PageList,
        RouteConfig.Page,
        RouteConfig.Post,
        RouteConfig.Module
      ]
    },
    {
      id: 'template',
      title: 'Themes',
      icon: 'color-swatch',
      position: VerticalDisplayPosition.Top,
      route: [RouteConfig.ThemeList, RouteConfig.Theme],
      detail: []
    },
    {
      id: 'files',
      title: 'Files',
      icon: 'file',
      position: VerticalDisplayPosition.Top,
      detail: []
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      position: VerticalDisplayPosition.Bottom,
      detail: []
    }
  ];

  constructor(
    private readonly joyrideService: JoyrideService,
    public appService: AppService,
    private router: Router,
    public appEvent: AppEventService,
    public sideMenuService: SideMenuService
  ) {}

  public ngOnInit(): void {
    this.initMenu();
  }

  public initMenu(): void {
    const route = this.router.url.split('/')[2];
    this.currentSelectedItem =
      this.groups.find(i => i.route && i.route.includes(route)) ||
      this.groups[1];

    this.expandChange.emit(this.isShowMenu);
  }

  public toggleMiniSize(): void {
    this.sideMenuService.miniSize$.next(
      !this.sideMenuService.miniSize$.getValue()
    );
  }

  public selectMenu(group: MixToolbarMenu): void {
    if (this.currentSelectedItem === group) return;
    this.currentSelectedItem = group;

    if (group && group.route) {
      this.router.navigateByUrl(`${group.route[0]}`);
    }

    if (!this.sideMenuService.open$.getValue()) {
      this.sideMenuService.open$.next(true);
    }
  }
}
