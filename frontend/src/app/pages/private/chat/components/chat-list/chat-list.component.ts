import {Component, EventEmitter, inject, Output, ViewEncapsulation} from '@angular/core';
import {Card} from 'primeng/card';
import {BaseInjectionsComponent} from '../../../../../core/components/base-injections/base-injections.component';
import {ChatService} from '../../services/chat.service';
import {ChatInterface, ChatUserInterface} from '../../interfaces/chat.interface';
import {Button} from 'primeng/button';
import {UserInterface} from '../../../../../core/interfaces/user/user.interface';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {ModalService} from '../../../../../core/services/overlays/modal.service';
import {CreateChatComponent} from '../create-chat/create-chat.component';

@Component({
  selector: 'app-chat-list',
  imports: [
    Card,
    Button
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ChatListComponent extends BaseInjectionsComponent {

  @Output() chat: EventEmitter<ChatInterface> = new EventEmitter<ChatInterface>();

  private readonly _chatService: ChatService = inject(ChatService);
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _modalService: ModalService<any, any> = inject(ModalService);

  protected chats: ChatInterface[] = [];
  protected currentUser: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;

  ngOnInit() {
    this._layoutService.updateTitle('Chat');
    this._chatService.findAll().subscribe((response) => {
      this.chats = response.data;
    });
  }

  protected getUserToChatName(users: ChatUserInterface[]): ChatUserInterface | undefined {
    return users.find((user) => user?.id !== this.currentUser.id)
  }

  protected openChat(chat: ChatInterface) {
    this.chat.emit(chat);
  }

  protected createChat() {
    this._modalService.openDialog(CreateChatComponent, {
      closable: true,
      modal: true,
      header: 'Iniciar Chat',
      appendTo: 'body',
      breakpoints: 0,
      width: '300px',
      height: 'auto'
    })
  }
}
