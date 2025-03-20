import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import { LayoutService } from '../../../../core/services/layout/layout.service';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../../core/services/navigation/navigation.service';
import {MenuService} from '../../../../core/services/menu/menu.service';
import {SidebarMenu} from '../../../../core/interfaces/menu/menu.interface';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    Drawer,
    Button,
    NgClass,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _navigationService: NavigationService = inject(NavigationService);
  private readonly _menuService: MenuService = inject(MenuService);

  protected menu!: SidebarMenu[];

  public visible: boolean = this._layoutService.sidebarStatus$.getValue();



  ngAfterViewInit() {
    this._layoutService.sidebarStatus$.subscribe(status => {
      this.visible = status;
    });
    this._menuService.getSidebarMenu().subscribe(menu => {
      this.menu = menu;
    })
  }

  protected toggleSidebar(): void {
    this._layoutService.toggleSidebar();
  }

  protected closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  protected navigateTo(routes: string[]) {
    this._navigationService.navigateTo(routes);
    this.toggleSidebar();
  }

  ngOnDestroy() {
    this._layoutService.sidebarStatus$.unsubscribe();
  }

}
