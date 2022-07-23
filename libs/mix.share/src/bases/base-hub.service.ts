import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { filter, Observable, Subject } from 'rxjs';

import { SignalEvent } from '../interfaces/signal-event';
import { SignalEventType } from '../interfaces/signal-event-type';
import { DOMAIN_URL } from '../token';

@Injectable({ providedIn: 'root' })
export abstract class BaseSignalService {
  public _signalEvent: Subject<SignalEvent<any>> = new Subject<any>();
  public _openConnection = false;
  public _isInitializing = false;
  public _hubConnection!: HubConnection;
  protected get _hubName() {
    return '';
  }
  protected get _roomName() {
    return '';
  }

  abstract _setupSignalREvents(): void;

  constructor(@Inject(DOMAIN_URL) public domain: string) {}

  public getMessage<T>(
    ...filterValues: SignalEventType[]
  ): Observable<SignalEvent<T>> {
    this._ensureConnection();
    return this._signalEvent
      .asObservable()
      .pipe(filter(event => filterValues.some(f => f === event.type)));
  }

  protected async _initializeSignalR() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.domain + 'hub/' + this._hubName)
      .withAutomaticReconnect()
      .build();

    try {
      await this._hubConnection.start();
      if (this._roomName)
        await this._hubConnection.invoke('JoinRoom', this._roomName);

      this._openConnection = true;
      this._isInitializing = false;
      this._setupSignalREvents();
    } catch (err) {
      this._hubConnection.stop().then(_ => {
        this._openConnection = false;
      });
    }
  }

  protected async _ensureConnection() {
    if (this._openConnection || this._isInitializing) return;
    await this._initializeSignalR();
  }

  protected _pushMessage<T>(payload: SignalEvent<T>) {
    this._signalEvent.next(payload);
  }
}
