import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BloodType} from '../../interfaces/utils/blood-types.interface';

@Injectable({
  providedIn: 'root'
})
export class BloodTypesService {

  private readonly _http: HttpClient = inject(HttpClient);

  private readonly url = 'assets/data/utils/blood-types.json';

  public getBloodTypes(): Observable<BloodType[]> {
    return this._http.get<BloodType[]>(this.url);
  }

}
