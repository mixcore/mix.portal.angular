import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { PortalSidebarComponent } from '@mixcore/ui/sidebar';
import { TuiProgressModule } from '@taiga-ui/kit';
import { MainExplorerComponent } from '../../components/main-explorer/main-explorer.component';
import { MainSideMenuComponent } from '../../components/main-side-menu/main-side-menu.component';
import { MainToolbarComponent } from '../../components/main-toolbar/main-toolbar.component';

@Component({
  selector: 'mix-portal-layout',
  templateUrl: './portal.layout.html',
  styleUrls: ['./portal.layout.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MainSideMenuComponent,
    MainToolbarComponent,
    MainExplorerComponent,
    TuiProgressModule,
    PortalSidebarComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixPortalLayoutComponent {
  router = inject(Router);
  showProgress = signal(false);

  constructor() {
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationStart) {
        this.showProgress.set(true);
      } else if (v instanceof NavigationEnd) {
        this.showProgress.set(false);
      }
    });
  }
}
