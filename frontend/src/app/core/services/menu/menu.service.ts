import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {SidebarMenu} from '../../interfaces/menu/menu.interface';
import { AuthSessionService } from '../auth/auth-session.service';
import {RolesInterface, UserInterface} from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly _authSessionService: AuthSessionService = inject(AuthSessionService);

  private readonly sidebarMenuUrl = 'assets/data/menus/sidebarMenu.json';
  constructor(private readonly _http: HttpClient) { }

  public getSidebarMenu(): Observable<SidebarMenu[]> {
    const user: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '');
    const role: 'admin' | 'user' | 'super_admin' | null = user.roles ? user.roles[0].name : null;
    return this._http.get<SidebarMenu[]>(this.sidebarMenuUrl).pipe(
      map((menu) => {
        return menu.filter((menuItem: SidebarMenu) => {
          if(role) {
            return menuItem.roles.includes(role);
          }
          return false;
        })
      })
    );
  }

}
