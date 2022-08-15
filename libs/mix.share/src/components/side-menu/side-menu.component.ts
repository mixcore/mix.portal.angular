import { animate, style, transition, trigger } from '@angular/animations';
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
  styleUrls: ['./side-menu.component.scss', './styles.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    ShareModule,
    JoyrideModule,
    DashboardMenuComponent,
    ContentMenuComponent,
    TemplateMenuComponent
  ],
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
      route: [RouteConfig.Page, RouteConfig.Post, RouteConfig.Module]
    },
    {
      id: 'template',
      title: 'Themes',
      icon: 'color-swatch',
      position: VerticalDisplayPosition.Top,
      detail: []
    },
    {
      id: 'files',
      title: 'Files',
      icon: 'file',
      position: VerticalDisplayPosition.Top,
      detail: []
    }
  ];

  constructor(
    private readonly joyrideService: JoyrideService,
    public appService: AppService,
    private router: Router,
    public appEvent: AppEventService
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

  public toggleMenu(): void {
    this.isShowMenu = !this.isShowMenu;
    this.expandChange.emit(this.isShowMenu);
  }

  public toggleMiniGroupBar(): void {
    this.isMiniGroupBar = !this.isMiniGroupBar;
  }

  public selectGroup(group: MixToolbarMenu): void {
    this.currentSelectedItem = group;
    if (!this.isShowMenu) {
      this.isShowMenu = true;
      this.expandChange.emit(this.isShowMenu);
    }
  }
}
