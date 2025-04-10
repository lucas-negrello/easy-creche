import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {ScheduleInterface} from '../interfaces/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService extends HttpBaseService<ScheduleInterface>{
  protected override resource: string = 'schedule';
}
