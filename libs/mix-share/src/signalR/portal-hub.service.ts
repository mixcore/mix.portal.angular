import { Injectable } from '@angular/core';
import { SignalEventType } from '@mixcore/lib/model';
import { BaseSignalService } from './base-hub.service';

@Injectable({ providedIn: 'root' })
export class MixPortalHub extends BaseSignalService {
  public connectionId = '';
  public username = '';
  public avatar = '';

  public override get _hubName() {
    return 'portalHub';
  }

  public _setupSignalREvents() {
    this._hubConnection.on('receive_message', (result) => {
      if (!result) return;

      if (result.action && result.action === SignalEventType.NewMessage) {
        this._pushMessage({
          type: result.action,
          data: result,
        });
        return;
      }
    });

    this._hubConnection.onclose(() => (this._openConnection = false));
  }
}
