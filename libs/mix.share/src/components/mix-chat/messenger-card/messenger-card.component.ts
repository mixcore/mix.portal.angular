import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MixUser } from '@mix-spa/mix.lib';
import { TuiAppearance, tuiButtonOptionsProvider } from '@taiga-ui/core';

import { ShareModule } from '../../../share.module';

@Component({
  selector: 'mix-messenger-card [user]',
  templateUrl: './messenger-card.component.html',
  styleUrls: ['./messenger-card.component.scss'],
  standalone: true,
  imports: [ShareModule],
  providers: [
    tuiButtonOptionsProvider({
      shape: 'rounded',
      appearance: TuiAppearance.Outline,
      size: 's'
    })
  ]
})
export class MixMessengerCardComponent {
  @Input() public user!: MixUser;
  @Output() public closeChat: EventEmitter<MixUser> = new EventEmitter();
  @Output() public minimizeChat: EventEmitter<MixUser> = new EventEmitter();

  public onCloseChat(): void {
    this.closeChat.emit(this.user);
  }

  public onMinimizeChat(): void {
    this.minimizeChat.emit(this.user);
  }
}
