import { Component } from '@angular/core';
import { MainSliderComponent } from "../../Components/Home-components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
