import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-in-out-monitoring',
  imports: [],
  templateUrl: './in-out-monitoring.component.html',
  styleUrl: './in-out-monitoring.component.scss'
})
export class InOutMonitoringComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Monitoramento');
  }
}
