import { Component } from '@angular/core';
import { MixUser } from '@mix-spa/mix.lib';

import { ShareModule } from '../../share.module';
import { MixMessengerCardComponent } from './messenger-card/messenger-card.component';

@Component({
  selector: 'mix-chat-box',
  templateUrl: './mix-chat-box.component.html',
  styleUrls: ['./mix-chat-box.component.scss'],
  standalone: true,
  imports: [ShareModule, MixMessengerCardComponent]
})
export class MixChatBoxComponent {
  public usersOnChatting: MixUser[] = [];
  public usersOnMinimize: MixUser[] = [];

  public addChatting(user: MixUser): void {
    const userToAddIndex = this.usersOnMinimize.findIndex(
      u => u.userName === user.userName
    );
    if (userToAddIndex >= 0) {
      this.usersOnChatting.push(this.usersOnMinimize[userToAddIndex]);
      this.usersOnMinimize = this.usersOnMinimize.filter(
        u => u.userName !== user.userName
      );
    }
  }

  public addToMinimize(user: MixUser): void {
    this.usersOnMinimize.push(user);
    this.closeChat(user);
  }

  public closeChat(user: MixUser): void {
    this.usersOnChatting = this.usersOnChatting.filter(
      u => u.userName !== user.userName
    );
  }
}
