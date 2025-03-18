import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-register-responsible',
  imports: [],
  templateUrl: './register-responsible.component.html',
  styleUrl: './register-responsible.component.scss'
})
export class RegisterResponsibleComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Registro de Responsável');
  }
}
