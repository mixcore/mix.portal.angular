import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { fadeInExpandOnEnterAnimation } from '@mixcore/share/animation';
import { AuthService } from '@mixcore/share/auth';
import { MixIconButtonComponent } from '@mixcore/ui/icon-button';
import { DialogService } from '@ngneat/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { tuiPure } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';

export type MenuItem = {
  title: string;
  url: string;
  icon?: string;
  children?: MenuItem[];
  align?: 'top' | 'bottom';
};

@Component({
  selector: 'mix-main-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    MixIconButtonComponent,
    RouterModule,
    TranslocoModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiDropdownModule,
  ],
  templateUrl: './main-side-menu.component.html',
  styleUrls: ['./main-side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInExpandOnEnterAnimation({ duration: 350 })],
})
export class MainSideMenuComponent {
  public activeRoute = inject(ActivatedRoute);
  public authService = inject(AuthService);
  public dialogService = inject(DialogService);

  @Input() public showDetail = true;
  @Input() public menu: MenuItem[] = this.authService.portalMenu;

  public selectedMenu: MenuItem | undefined = undefined;
  public selectedMenus: Record<string, MenuItem | undefined> = {};
  public settingMenu = {
    title: 'Settings',
    icon: 'settings',
    align: 'bottom',
  };

  constructor(public route: Router) {}

  @tuiPure
  public isMenuSelected(item: MenuItem, selectedMenu: MenuItem | undefined) {
    return item.title === selectedMenu?.title;
  }

  public onMenuSelect(menu: MenuItem) {
    if (!menu.children?.length) {
      this.route.navigateByUrl(menu.url);
      this.selectedMenu = menu;

      return;
    }

    if (this.selectedMenu?.title === menu.title) {
      this.selectedMenu = undefined;
      return;
    }

    this.selectedMenu = menu;
  }

  public toggleMenu(): void {
    this.showDetail = !this.showDetail;
    if (!this.showDetail) this.selectedMenus = {};
  }

  public getShortName(name: string) {
    if (name.length >= 10) {
      return name
        .split(' ')
        .map((x) => x.charAt(0))
        .join('');
    }

    return name;
  }

  public showSetting() {
    this.dialogService.open(SettingDialogComponent, {
      width: 'fit-content',
      id: 'setting-pannel',
    });
  }
}
