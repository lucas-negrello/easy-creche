import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {SidebarMenu} from '../../interfaces/menu/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly sidebarMenuUrl = 'assets/data/menus/sidebarMenu.json';
  constructor(private readonly _http: HttpClient) { }

  public getSidebarMenu(): Observable<SidebarMenu[]> {
    return this._http.get<SidebarMenu[]>(this.sidebarMenuUrl);
  }

}
