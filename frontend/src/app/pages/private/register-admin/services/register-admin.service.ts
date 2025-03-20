import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {AdminInterface} from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterAdminService extends HttpBaseService<AdminInterface>{
  protected override resource: string = 'register-admins';
}
