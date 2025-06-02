import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {ChildFrequencyInterface} from '../interfaces/child-frequency.interface';

@Injectable({
  providedIn: 'root'
})
export class ChildFrequencyService extends HttpBaseService<ChildFrequencyInterface>{
  protected override resource: string = 'child-presences';

}
