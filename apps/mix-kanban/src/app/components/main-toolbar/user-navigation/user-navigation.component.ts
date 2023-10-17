import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TippyDirective } from '@ngneat/helipopper';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { AuthService } from '@mixcore/share/auth';
import { UserListVm } from '@mixcore/lib/model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '@mixcore/ui/modal';
import { Router } from '@angular/router';
import { CMS_ROUTES } from '../../../app.routes';
import { TuiBadgeModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-user-navigation',
  standalone: true,
  imports: [CommonModule, TippyDirective, UserAvatarComponent, TuiBadgeModule],
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss'],
})
export class UserNavigationComponent {
  public authService = inject(AuthService);
  public modal = inject(ModalService)
  public router = inject(Router);;
  public userInfo?: UserListVm;

  constructor() {
    this.authService.user$.pipe(takeUntilDestroyed()).subscribe((v) => {
      this.userInfo = new UserListVm({
        userName: v?.userName,
        id: v?.id,
        email: v?.email
      });
    });
  }

  public logout(): void {
    this.modal.warning('Do you want to logout ?').subscribe((ok) => {
      if (!ok) return;

      this.authService.logout(() => {
        this.router.navigateByUrl(CMS_ROUTES.auth.login.fullPath);
      });
    });
  }
}
