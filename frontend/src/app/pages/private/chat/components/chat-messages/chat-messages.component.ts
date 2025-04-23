import {Component, ElementRef, inject, Input, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {ChatInterface} from '../../interfaces/chat.interface';
import {BaseInjectionsComponent} from '../../../../../core/components/base-injections/base-injections.component';
import {Card} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {ChatMessageService} from '../../services/chat-message.service';
import {ChatMessageInterface} from '../../interfaces/chat-message.interface';
import {UserInterface} from '../../../../../core/interfaces/user/user.interface';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-chat-messages',
  imports: [
    Card,
    FormsModule,
    InputText,
    Message,
    Button,
    DatePipe
  ],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ChatMessagesComponent extends BaseInjectionsComponent {
  @Input() chat?: ChatInterface;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef<HTMLDivElement>;

  private readonly chatMessageService: ChatMessageService = inject(ChatMessageService);

  protected message: string = '';
  protected currentUser: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;

  protected chatMessages: ChatMessageInterface[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chat'] && changes['chat'].currentValue?.id) {
      this.fetchData();
    }
  }

  protected scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  fetchData(): void {
    if(this.chat && this.chat.id) {
      this.chatMessageService.getChatMessages(this.chat.id).subscribe((response) => {
        this.chatMessages = response.data;
        setTimeout(() => this.scrollToBottom(), 500);
      });
    }
  }

  sendMessage(): void {
    if(this.message && this.chat && this.chat.id) {
      this.chatMessageService.sendChatMessage(this.chat.id, this.message).subscribe((response) => {
        this.message = '';
        this.fetchData();
      });
    }
  }

}
