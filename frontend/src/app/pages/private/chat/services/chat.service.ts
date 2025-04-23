import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {ChatInterface} from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends HttpBaseService<ChatInterface>{

  protected override resource: string = 'chats';

  // TODO - Alterar o metodo de create para passar apenas o id
}
