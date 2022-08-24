import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { VerticalDisplayPosition } from '@mix-spa/mix.lib';
import {
  TuiDropdownControllerModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TuiDropdownHoverModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';

import { ContentMenuComponent } from '../content-menu/content-menu.component';
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component';
import { SettingMenuComponent } from '../setting-menu/setting-menu.component';
import { MixToolbarMenu } from '../side-menu.component';
import { SideMenuService } from '../side-menu.service';
import { TemplateMenuComponent } from '../template-menu/template-menu.component';

@Component({
  selector: 'mix-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrls: ['../side-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TablerIconsModule,
    TuiHostedDropdownModule,
    DashboardMenuComponent,
    ContentMenuComponent,
    TemplateMenuComponent,
    SettingMenuComponent,
    SideMenuButtonComponent,
    TuiDropdownHoverModule,
    TuiDropdownControllerModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SideMenuButtonComponent implements OnInit {
  @Input() public currentSelectedItem: MixToolbarMenu | undefined;
  @Input() public menu!: MixToolbarMenu;
  @Output() public selectMenu: EventEmitter<MixToolbarMenu> =
    new EventEmitter();

  @HostBinding('style.margin') public margin!: string;

  public isShowSubMenuOnHover = false;

  constructor(public sideMenuService: SideMenuService) {}

  ngOnInit(): void {
    const marginTop =
      this.menu.position === VerticalDisplayPosition.Bottom ? 'auto' : '0px';

    this.margin = `${marginTop} 0px 0px 0px`;
  }
}
