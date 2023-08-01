import { Injectable } from '@angular/core';

import { SignalEventType } from '@mixcore/lib/model';
import { BaseSignalService } from './base-hub.service';

@Injectable({ providedIn: 'root' })
export class ThemeSignalService extends BaseSignalService {
  public override get _hubName() {
    return 'mixThemeHub';
  }
  public override get _roomName() {
    return 'Theme';
  }

  public _setupSignalREvents() {
    this._hubConnection.on('receive_message', (result) => {
      if (!result) return;

      const data = JSON.parse(result);
      if (data.action && data.action === 'Downloading') {
        this._pushMessage({
          type: SignalEventType.THEME_DOWNLOAD,
          data: Math.round(data.message),
        });
      }
    });

    this._hubConnection.onclose(() => (this._openConnection = false));
  }
}
