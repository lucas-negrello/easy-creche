import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-resources',
  imports: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Materiais e Recursos');
  }
}
