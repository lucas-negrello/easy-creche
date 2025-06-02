import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {ChildDevelopmentInterface} from '../interfaces/child-development.interface';

@Injectable({
  providedIn: 'root'
})
export class ChildDevelopmentService extends HttpBaseService<ChildDevelopmentInterface>{
    protected override resource: string = 'child-development';
}
