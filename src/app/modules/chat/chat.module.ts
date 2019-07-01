import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './page/chat.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { NetworkStatusComponent } from './components/network-status/network-status.component';

@NgModule({
  declarations: [ChatComponent, ChatItemComponent, NetworkStatusComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
