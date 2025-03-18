import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  public readonly darkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._getDarkModeFromLocalStorage());

  public setupTheme() {
    this._setupDarkMode();
  }
  public toggleDarkMode(): any{
    if(!this.darkMode$.getValue()){
      this.darkMode$.next(true);
      localStorage.setItem('theme-dark', 'dark');
      return document.querySelector('html')?.classList.add('dark');
    }
    this.darkMode$.next(false);
    localStorage.setItem('theme-dark', 'light');
    return document.querySelector('html')?.classList.remove('dark');
  }

  private _setupDarkMode() {
    if(this._getDarkModeFromLocalStorage()){
      document.documentElement.classList.add('dark');
      return;
    }
    document.documentElement.classList.remove('dark');
  }

  private _getDarkModeFromLocalStorage(): boolean {
    return localStorage.getItem('theme-dark') === 'dark';
  }

}
