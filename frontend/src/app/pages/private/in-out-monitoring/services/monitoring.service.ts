import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {MonitoringInterface} from '../interfaces/monitoring.interface';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService extends HttpBaseService<MonitoringInterface>{
  protected override resource: string = 'monitoring';

}
