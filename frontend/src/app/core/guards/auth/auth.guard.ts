import {inject, Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthSessionService } from '../../services/auth/auth-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  private readonly _authSessionService: AuthSessionService = inject(AuthSessionService);
  private readonly _router: Router = inject(Router);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authSessionService.isAuthenticated()) {
      return true;
    }
    this._router.navigate(['/auth/login']);
    return false;
  }
}
