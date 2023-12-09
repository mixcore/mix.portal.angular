import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UserListVm } from '@mixcore/lib/model';
import { AuthService } from '@mixcore/share/auth';
import { ModalService } from '@mixcore/ui/modal';
import { DialogService } from '@ngneat/dialog';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { UserProfileDialofComponent } from '../../user-profile-dialof/user-profile-dialof.component';
import { ApplicationListComponent } from '../application-list/application-list.component';

@Component({
  selector: 'mix-user-navigation',
  standalone: true,
  imports: [
    CommonModule,
    TippyDirective,
    UserAvatarComponent,
    TuiBadgeModule,
    ApplicationListComponent,
  ],
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserNavigationComponent {
  public authService = inject(AuthService);
  public modal = inject(ModalService);
  public router = inject(Router);
  public userInfo?: UserListVm;
  public dialog = inject(DialogService);

  constructor() {
    this.authService.user$.pipe(takeUntilDestroyed()).subscribe((v) => {
      this.userInfo = new UserListVm({
        userName: v?.userName,
        id: v?.id,
        email: v?.email,
      });
    });
  }

  public logout(): void {
    this.modal.confirm('Do you want to logout ?').subscribe((ok) => {
      if (!ok) return;

      this.authService.logout(() => {
        this.router.navigateByUrl('auth/login');
      });
    });
  }

  public userProfile(): void {
    this.dialog.open(UserProfileDialofComponent, {
      windowClass: UserProfileDialofComponent.windowClass,
      width: '80vw',
      height: '80vh',
    });
  }
}
