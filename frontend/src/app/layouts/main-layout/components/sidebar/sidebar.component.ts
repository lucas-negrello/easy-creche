import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import { LayoutService } from '../../../../core/services/layout/layout.service';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '../../../../core/services/navigation/navigation.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    Drawer,
    Button,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('drawerRef') drawerRef!: Drawer;

  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _navigationService: NavigationService = inject(NavigationService);
  visible: boolean = this._layoutService.sidebarStatus$.getValue();


  ngAfterViewInit() {
    this._layoutService.sidebarStatus$.subscribe(status => {
      this.visible = status;
    });
  }

  protected toggleSidebar(): void {
    this._layoutService.toggleSidebar();
  }

  protected closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  protected navigateTo(routes?: string[]) {
    this._navigationService.navigateWithIdTo(this._route, routes);
    this.toggleSidebar();
  }

  ngOnDestroy() {
    this._layoutService.sidebarStatus$.unsubscribe();
  }

}
