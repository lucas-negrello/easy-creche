import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-schedules',
  imports: [
    Card
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
