import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
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
  ],
})
export class MixPortalLayoutComponent {
  router = inject(Router);
  showProgress = signal(false);

  constructor() {
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationStart) {
        this.showProgress.set(true);
      }

      if (v instanceof NavigationEnd) {
        setTimeout(() => {
          this.showProgress.set(false);
        }, 300);
      }
    });
  }
}
