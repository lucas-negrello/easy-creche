import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemesService } from './core/services/themes/themes.service';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmDialog, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly _themes: ThemesService = inject(ThemesService);

  ngOnInit() {
    this._themes.setupTheme();
  }

}
