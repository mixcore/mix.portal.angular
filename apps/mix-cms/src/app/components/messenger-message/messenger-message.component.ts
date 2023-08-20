import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

import { IMessage } from '../messenger/messenger.component';

@Component({
  selector: 'mix-messenger-message',
  standalone: true,
  imports: [CommonModule, TuiAvatarModule],
  templateUrl: './messenger-message.component.html',
  styleUrls: ['./messenger-message.component.scss'],
})
export class MessengerMessageComponent {
  @Input() public fromAnother = false;
  @Input() public message: IMessage | undefined = undefined;
}
