import {Component} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-verification',
  imports: [
    ButtonDirective,
    ReactiveFormsModule
  ],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export class VerificationComponent {

}
