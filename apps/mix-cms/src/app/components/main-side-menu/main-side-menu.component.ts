import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@mixcore/share/auth';
import { MixIconButtonComponent } from '@mixcore/ui/icon-button';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';

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
    TuiActiveZoneModule,
  ],
  templateUrl: './main-side-menu.component.html',
  styleUrls: ['./main-side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainSideMenuComponent {
  public activeRoute = inject(ActivatedRoute);
  public authService = inject(AuthService);

  @Input() public showDetail = true;
  @Input() public menu: MenuItem[] = this.authService.portalMenu;

  public selectedMenu: MenuItem | undefined = undefined;
  public selectedMenus: Record<string, MenuItem | undefined> = {};

  constructor(public route: Router) {}

  public onMenuSelect(menu: MenuItem) {
    if (this.selectedMenus[menu.title]) {
      this.selectedMenus[menu.title] = undefined;
    } else {
      this.selectedMenus[menu.title] = menu;
    }
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
}
