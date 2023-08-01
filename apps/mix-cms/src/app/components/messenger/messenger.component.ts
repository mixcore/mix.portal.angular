import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiBadgedContentModule, TuiTextAreaModule } from '@taiga-ui/kit';

import { SignalEventType } from '@mixcore/lib/model';
import { UserSignalService } from '@mixcore/share/signalR';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { MessengerMessageComponent } from '../messenger-message/messenger-message.component';

export interface IMessage {
  createdDateTime: Date;
  from: {
    connectionId: string;
    username: string;
    avatar: string;
  };
  message: string;
  displayMessage: string[];
  fromAnother: boolean;
}

@Component({
  selector: 'mix-share-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MessengerMessageComponent,
    TuiTextAreaModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiBadgedContentModule,
    EmojiPickerComponent,
  ],
})
export class MessengerComponent {
  public message: FormControl = new FormControl('');
  public messages: IMessage[] = [];
  public displayMessages: IMessage[] = [];
  public minimize = false;
  public newMessageCount = 0;
  public date = new Date();

  constructor(
    private userHub: UserSignalService,
    private cdr: ChangeDetectorRef
  ) {
    this.userHub.getMessage().subscribe((message) => {
      if (message.type === SignalEventType.NewMessage) {
        this.handleNewMessage(message.data as IMessage);
        this.handleNotify();
      }
    });
  }

  public submitMessage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.message.value) return;

    this.userHub._sendMessage(this.message.value);
    this.message.reset();
  }

  public handleNewMessage(newMessage: IMessage): void {
    newMessage.fromAnother =
      newMessage.from.connectionId !== this.userHub.connectionId;

    const prevMessageIndex = this.messages.length - 1;
    const lastMessage = this.messages[prevMessageIndex];
    const fromSameUser =
      lastMessage &&
      lastMessage.from.connectionId === newMessage.from.connectionId;

    if (fromSameUser) {
      const previousMessage = Object.assign(
        {},
        this.messages[prevMessageIndex]
      );
      previousMessage.displayMessage.push(newMessage.message);
      this.messages[prevMessageIndex] = Object.assign({}, previousMessage);
    } else {
      newMessage.displayMessage = [];
      newMessage.displayMessage.push(newMessage.message);
      this.messages.push(newMessage);
    }

    this.displayMessages = this.messages.slice().reverse();
    this.cdr.detectChanges();
  }

  public handleNotify(): void {
    if (!this.minimize) return;

    this.newMessageCount += 1;
  }

  public toggleMinimize(): void {
    this.minimize = !this.minimize;
    if (!this.minimize) this.newMessageCount = 0;
  }

  public emojiSelect(emoji: string) {
    this.message.patchValue(`${this.message.value ?? ''}${emoji}`);
  }
}
