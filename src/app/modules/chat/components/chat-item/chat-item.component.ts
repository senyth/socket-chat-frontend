import { Component, OnInit, Input } from '@angular/core';
import { Chat } from 'src/app/core/models/chat';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {
  @Input() chat: Chat;
  @Input() typing: boolean;
  currentUserId: string;

  constructor() { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('user_id');
  }

}
