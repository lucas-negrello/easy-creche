import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly _router: Router = inject(Router);

  public navigateWithIdTo(route: ActivatedRoute, routes?: string[]) {
    const id = route.snapshot.paramMap.get('id');
    if(!routes) this._router.navigate([id]);
    if(routes) this._router.navigate([id, ...routes]);
  }

  public navigateTo(routes: string[]) {
    this._router.navigate([...routes]);
  }

  public navigateBack(route: ActivatedRoute) {
    this._router.navigate(['../'], {relativeTo: route})
  }

}
