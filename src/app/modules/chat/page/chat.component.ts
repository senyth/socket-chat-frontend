import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messageArray: Array<{user: string, message: string}> = [];
  constructor(
    private webSocketService: WebSocketService,
  ) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      // this.isTyping = false;
    });
  }

  ngOnInit() {
  }

  sendMessage() {
    console.log('send message');
    this.webSocketService.sendMessage({user: '5d1ae65afad4e91f27b60afc', message: 'sample message'});
    // this.message = '';
  }

}
