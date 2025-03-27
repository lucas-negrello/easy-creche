import {Directive, inject} from '@angular/core';
import {ToastService} from '../../services/overlays/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthSessionService} from '../../services/auth/auth-session.service';
import {UserInterface} from '../../interfaces/user/user.interface';

@Directive()
export abstract class BaseInjectionsComponent {
  protected readonly toast: ToastService = inject(ToastService);
  protected readonly _router: Router = inject(Router);
  protected readonly _route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly _authSessionService: AuthSessionService = inject(AuthSessionService);

  protected loading: boolean = false;
  protected user: UserInterface | '' = JSON.parse(this._authSessionService.getProfile() ?? '');
}
