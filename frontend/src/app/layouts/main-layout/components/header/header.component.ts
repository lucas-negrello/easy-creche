import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {Avatar} from 'primeng/avatar';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {LayoutService} from '../../../../core/services/layout/layout.service';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {DarkmodeSelectorComponent} from './components/darkmode-selector/darkmode-selector.component';

@Component({
  selector: 'app-header',
  imports: [
    Menubar,
    Avatar,
    InputText,
    Button,
    SidebarComponent,
    DarkmodeSelectorComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  protected readonly layoutService: LayoutService = inject(LayoutService);

  ngOnInit() {
    this.layoutService.closeSidebar();
  }

}
