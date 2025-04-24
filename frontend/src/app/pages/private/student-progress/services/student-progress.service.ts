import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {StudentProgressInterface} from '../interfaces/student-progress.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentProgressService extends HttpBaseService<StudentProgressInterface>{
    protected override resource: string = 'student-progress';
}
