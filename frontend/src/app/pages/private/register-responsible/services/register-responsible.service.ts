import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {ResponsibleInterface} from '../interfaces/responsible.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterResponsibleService extends HttpBaseService<ResponsibleInterface>{
  protected override resource: string = 'register-responsibles';
}
