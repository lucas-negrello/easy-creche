import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-schedules',
  imports: [],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.scss'
})
export class SchedulesComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Agendamentos');
  }
}
