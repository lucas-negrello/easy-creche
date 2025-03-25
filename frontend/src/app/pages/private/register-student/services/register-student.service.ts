import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {StudentInterface} from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterStudentService extends HttpBaseService<StudentInterface>{
  protected override resource: string = 'register-students';
}
