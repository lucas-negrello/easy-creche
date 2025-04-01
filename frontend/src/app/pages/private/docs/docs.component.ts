import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-docs',
  imports: [],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss'
})
export class DocsComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);

  ngOnInit() {
    this._layoutService.updateTitle('Documentos');
  }

}
