import {inject, Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthSessionService } from '../../services/auth/auth-session.service';
import {UserInterface} from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {

  private readonly _authSessionService: AuthSessionService = inject(AuthSessionService);
  private readonly _router: Router = inject(Router);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const profile: UserInterface | null = JSON.parse(this._authSessionService.getProfile() ?? '');
    if(profile) {
      if(profile.roles && profile.roles[0].name.includes('user')) {
        return true;
      }
    }
    this._router.navigate(['']);
    return false;
  }
}
