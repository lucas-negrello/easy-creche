import { Component } from '@angular/core';
import {Menubar} from "primeng/menubar";

@Component({
  selector: 'app-footer',
    imports: [
        Menubar,
    ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
