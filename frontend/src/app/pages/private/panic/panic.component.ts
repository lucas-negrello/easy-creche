import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-panic',
  imports: [],
  templateUrl: './panic.component.html',
  styleUrl: './panic.component.scss'
})
export class PanicComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Botão do Pânico');
  }
}
