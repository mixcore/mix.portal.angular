import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TippyDirective } from '@ngneat/helipopper';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { AuthService } from '@mixcore/share/auth';
import { UserListVm } from '@mixcore/lib/model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'mix-user-navigation',
  standalone: true,
  imports: [CommonModule, TippyDirective, UserAvatarComponent],
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss'],
})
export class UserNavigationComponent {
  public authService = inject(AuthService);
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
}
