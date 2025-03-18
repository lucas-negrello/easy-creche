import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public readonly sidebarStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._getSidebarStatusFromLocalStorage());
  public readonly title$: BehaviorSubject<string> = new BehaviorSubject<string>(this._getTitleFromLocalStorage());

  public updateTitle(title: string): string {
    this.title$.next(title);
    localStorage.setItem('layout-title', title);
    return this.title$.getValue();
  }

  public toggleSidebar(): boolean {
    if(!this.sidebarStatus$.getValue()) {
      return this.openSidebar();
    }
    return this.closeSidebar();
  }

  public closeSidebar(): boolean {
    this.sidebarStatus$.next(false);
    localStorage.setItem('layout-sidebar-status', 'closed');
    return this.sidebarStatus$.getValue();
  }

  public openSidebar(): boolean {
    this.sidebarStatus$.next(true);
    localStorage.setItem('layout-sidebar-status', 'open');
    return this.sidebarStatus$.getValue();
  }

  private _getSidebarStatusFromLocalStorage(): boolean {
    return localStorage.getItem('layout-sidebar-status') === 'open';
  }

  private _getTitleFromLocalStorage(): string {
    return localStorage.getItem('layout-title') ?? '';
  }

}
