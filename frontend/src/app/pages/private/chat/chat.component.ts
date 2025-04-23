import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {ChatListComponent} from './components/chat-list/chat-list.component';
import {ChatMessagesComponent} from './components/chat-messages/chat-messages.component';
import {ChatInterface} from './interfaces/chat.interface';

@Component({
  selector: 'app-chat',
  imports: [
    Card,
    ChatListComponent,
    ChatMessagesComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  protected chat!: ChatInterface;

  protected getChat(chat: ChatInterface) {
    this.chat = chat;
  }

}
