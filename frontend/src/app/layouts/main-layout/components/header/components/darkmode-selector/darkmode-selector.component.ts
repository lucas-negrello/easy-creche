import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {Popover} from "primeng/popover";
import {ThemesService} from '../../../../../../core/services/themes/themes.service';

@Component({
  selector: 'app-darkmode-selector',
    imports: [
        Button
    ],
  templateUrl: './darkmode-selector.component.html',
  styleUrl: './darkmode-selector.component.scss'
})
export class DarkmodeSelectorComponent {

  protected readonly themesService: ThemesService = inject(ThemesService);

}
