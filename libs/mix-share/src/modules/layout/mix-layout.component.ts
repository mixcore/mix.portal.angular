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
import { MainSideMenuComponent } from '../../components/main-side-menu/main-side-menu.component';
import { MainToolbarComponent } from '../../components/main-toolbar/main-toolbar.component';

@Component({
  selector: '',
  templateUrl: './mix-layout.component.html',
  styleUrls: ['./mix-layout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MainToolbarComponent,
    MainSideMenuComponent,
  ],
})
export class MixLayoutComponent {
  public router = inject(Router);
  public showProgress = signal(false);
  public expand = signal(true);

  constructor() {
    this.router.events.subscribe((v) => {
      if (v instanceof NavigationStart) {
        this.showProgress.set(true);
      } else if (v instanceof NavigationEnd) {
        this.showProgress.set(false);
      }
    });
  }

  public onExpandChange() {
    this.expand.set(!this.expand());
  }
}
