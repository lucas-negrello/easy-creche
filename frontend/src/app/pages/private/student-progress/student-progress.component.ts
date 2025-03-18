import {Component, inject} from '@angular/core';
import { LayoutService } from '../../../core/services/layout/layout.service';

@Component({
  selector: 'app-student-progress',
  imports: [],
  templateUrl: './student-progress.component.html',
  styleUrl: './student-progress.component.scss'
})
export class StudentProgressComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Registro de Desenvolvimento');
  }
}
