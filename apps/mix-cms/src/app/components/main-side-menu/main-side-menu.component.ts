import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  collapseLeftOnLeaveAnimation,
  expandRightOnEnterAnimation,
} from '@mixcore/share/animation';
import { AuthService } from '@mixcore/share/auth';
import { MixIconButtonComponent } from '@mixcore/ui/icon-button';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
} from '@taiga-ui/core';
import { TuiTreeModule } from '@taiga-ui/kit';

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
    TuiLinkModule,
    RouterModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiDropdownModule,
    TuiTreeModule,
    TranslocoModule,
    TuiActiveZoneModule,
  ],
  templateUrl: './main-side-menu.component.html',
  styleUrls: ['./main-side-menu.component.scss'],
  animations: [
    collapseLeftOnLeaveAnimation({ duration: 250 }),
    expandRightOnEnterAnimation({ duration: 250 }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainSideMenuComponent {
  public activeRoute = inject(ActivatedRoute);
  public authService = inject(AuthService);

  @Input() public showDetail = false;
  @Input() public menu: MenuItem[] = this.authService.portalMenu;

  public selectedMenu: MenuItem | undefined = undefined;

  constructor(public route: Router) {}

  public onMenuSelect(menu: MenuItem) {
    if (this.selectedMenu?.title === menu.title) {
      this.selectedMenu = undefined;
      return;
    }

    this.selectedMenu = menu;
    this.route.navigateByUrl(menu.url);
  }

  public toggleMenu(): void {
    this.showDetail = !this.showDetail;
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

  public onActiveZone(active: boolean) {
    if (!active && this.selectedMenu) this.selectedMenu = undefined;
  }
}
