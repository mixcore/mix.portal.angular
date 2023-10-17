import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TippyDirective } from '@ngneat/helipopper';
import { UserListVm } from '@mixcore/lib/model';

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
  @Input() public size: 'l' | 's' | 'xs' = 'l';
}
