import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {DatatableComponent} from '../../../shared/datatable/datatable.component';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {RouterOutlet} from '@angular/router';
import {UserCreatedSchedulesComponent} from './components/user-created-schedules/user-created-schedules.component';
import {UserInSchedulesComponent} from './components/user-in-schedules/user-in-schedules.component';

@Component({
  selector: 'app-schedules',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    RouterOutlet,
    UserCreatedSchedulesComponent,
    UserInSchedulesComponent
  ],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.scss'
})
export class SchedulesComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Agendamentos');
  }
}
