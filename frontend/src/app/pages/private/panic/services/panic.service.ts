import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {PanicInterface} from '../interfaces/panic.interface';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../../core/interfaces/http/api-response.interface';
import {UserInterface} from '../../../../core/interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PanicService extends HttpBaseService<PanicInterface> {
  protected override resource: string = 'panic';

  public panic(payload: PanicInterface): Observable<ApiResponse<Pick<UserInterface, 'name' | 'email'>[]>> {
    return this.http.post<ApiResponse<Pick<UserInterface, 'name' | 'email'>[]>>(`${this.apiUrl}/${this.resource}`, payload);
  }
}
