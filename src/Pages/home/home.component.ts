import { Component } from '@angular/core';
import { MainSliderComponent } from "../../Components/Home-components/main-slider/main-slider.component";
import { HeaderComponent } from "../../Components/Home-components/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSliderComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
