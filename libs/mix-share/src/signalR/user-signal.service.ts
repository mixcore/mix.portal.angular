import { Injectable } from '@angular/core';
import { SignalEventType } from '@mixcore/lib/model';
import { BaseSignalService } from './base-hub.service';

@Injectable({ providedIn: 'root' })
export class UserSignalService extends BaseSignalService {
  public connectionId = '';
  public username = '';
  public avatar = '';

  public override get _hubName() {
    return 'portalHub';
  }
  public override get _roomName() {
    return 'portal';
  }

  public _setupSignalREvents() {
    this._hubConnection.on('receive_message', (result) => {
      if (!result) return;

      if (result.action && result.action === SignalEventType.ConnectSuccess) {
        this.connectionId = result.data.connectionId;
        this.username = result.data.username;
        this.avatar = result.data.avatar;
        return;
      }

      if (result.action && result.action === SignalEventType.NewMessage) {
        this._pushMessage({
          type: result.action,
          data: result,
        });
        return;
      }

      this._pushMessage({
        type: result.action,
        data: result.data,
      });
    });

    this._hubConnection.onclose(() => (this._openConnection = false));
  }

  public _sendMessage(message: string) {
    const request = {
      message: message,
      action: SignalEventType.NewMessage,
      from: {
        connectionId: this.connectionId,
        username: this.username,
        avatar: this.avatar,
      },
      title: 'New Message',
    };

    this._hubConnection.invoke(
      'SendGroupMessage',
      request,
      this._roomName,
      false
    );
  }
}
