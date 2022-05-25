import { Inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

import { BASE_URL } from '../token';

@Injectable({ providedIn: 'root' })
export class SignalRHubService {
  constructor(@Inject(BASE_URL) public base_url: string) {}

  public startConnection(hubName: string, receiveMessageCallback: () => void) {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(this.base_url + hubName)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log(`Start ${connection.connectionId}`);
      })
      .catch(() => {
        console.error(`Error when connect ${connection.connectionId}`);
      });

    connection.on('receive_message', msg => {
      console.log('Receive message: ', msg);
    });
  }
}
