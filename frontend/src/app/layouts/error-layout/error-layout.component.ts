import {Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-error-layout',
  imports: [
    RouterOutlet
  ],
  templateUrl: './error-layout.component.html',
  styleUrl: './error-layout.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ErrorLayoutComponent {

}
