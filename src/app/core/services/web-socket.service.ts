import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket = io('http://localhost:3000');

  constructor() { }

  sendMessage(data) {
    console.log(data);
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        console.log('message received from backend');
        console.log(data);
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
