import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {ChatInterface} from '../interfaces/chat.interface';
import {catchError, Observable, of} from 'rxjs';
import {ApiResponse} from '../../../../core/interfaces/http/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends HttpBaseService<ChatInterface>{

  protected override resource: string = 'chats';

  public createChat(recipient_id: string): Observable<ApiResponse<ChatInterface>> {
    return this.http.post<ApiResponse<ChatInterface>>(`${this.apiUrl}/${this.resource}`, { recipient_id })
      .pipe(
        catchError((error): Observable<ApiResponse<ChatInterface>> => {
          return of({success: false, message: 'Erro ao criar recurso', data: error, status_code: 400});
        }),
      );
  }
}
