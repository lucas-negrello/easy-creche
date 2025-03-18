import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemesService } from './core/services/themes/themes.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly _themes: ThemesService = inject(ThemesService);

  ngOnInit() {
    this._themes.setupTheme();
  }

}
