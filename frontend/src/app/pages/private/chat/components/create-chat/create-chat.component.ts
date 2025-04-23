import {Component, inject} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {BaseInjectionsComponent} from '../../../../../core/components/base-injections/base-injections.component';
import {AuthService} from '../../../../../core/services/auth/auth.service';
import {UserInterface} from '../../../../../core/interfaces/user/user.interface';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {UserList} from '../../../../../core/interfaces/auth/auth.interface';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-create-chat',
  imports: [
    Select,
    FormsModule,
    Button
  ],
  templateUrl: './create-chat.component.html',
  styleUrl: './create-chat.component.scss'
})
export class CreateChatComponent extends BaseInjectionsComponent {
  private readonly _chatService: ChatService = inject(ChatService);
  private readonly _authService: AuthService = inject(AuthService);

  protected users: UserList = {} as UserList;
  protected selectedOption!: number;

  ngOnInit() {
    this._authService.users().subscribe({
      next: users => {
        this._chatService.findAll().subscribe((response) => {
          const chats = response.data;
          const me: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;
          const chatUserIds = chats
            .flatMap(chat => chat.users
              .filter(user => user.id !== me.id )
              .map(user => user.id));
          this.users.user = users.user.filter(user =>
            user.id !== me.id && !chatUserIds.includes(user.id ?? 0)
          );
        })
      }
    });
  }

  protected startChat() {
    if(this.selectedOption !== 0) {
      // TODO - Implementar a logica para criar o chat novo
    }
  }


}
