import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 @Input() headerTitle:string = 'ShoperNova'
 @Input() subHeader:string = ''
 @Input() subImage:string = 'ShoperNova'

}
