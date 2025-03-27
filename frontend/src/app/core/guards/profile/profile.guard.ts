import {inject, Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, GuardResult, MaybeAsync} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate, CanActivateChild {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._verifyUserProfile();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this._verifyUserProfile();
  }

  private _verifyUserProfile(): Observable<boolean> {
    return this._authService.me().pipe(
      map((user) => {
        if(user){
          return true;
        }
        this._router.navigate(['/auth/login']);
        return false;
      }),
      catchError((error) => {
        this._router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }

}
