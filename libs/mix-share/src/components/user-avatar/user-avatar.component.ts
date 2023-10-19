import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserListVm } from '@mixcore/lib/model';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-user-avatar',
  standalone: true,
  imports: [CommonModule, TuiAvatarModule, TippyDirective],
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  @Input() public userInfo!: UserListVm;
  @Input() public size: 'xl' | 'l' | 's' | 'xs' = 'l';
}
