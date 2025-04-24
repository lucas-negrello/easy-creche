import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../../core/interfaces/http/api-response.interface';
import {ChatMessageInterface} from '../interfaces/chat-message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  protected _apiUrl = environment.apiUrl;

  private _http: HttpClient = inject(HttpClient);

  public getChatMessages(chatId: number): Observable<ApiResponse<ChatMessageInterface[]>> {
    return this._http.get<ApiResponse<ChatMessageInterface[]>>(`${this._apiUrl}/chats/${chatId}/messages`);
  }

  public sendChatMessage(chatId: number, message: string): Observable<ApiResponse<ChatMessageInterface>> {
    return this._http.post<ApiResponse<ChatMessageInterface>>(`${this._apiUrl}/chats/${chatId}/messages`, {message});
  }
}
