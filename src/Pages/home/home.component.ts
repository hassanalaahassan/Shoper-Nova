import { Component } from '@angular/core';
import { MainSliderComponent } from "../../Components/Home-components/main-slider/main-slider.component";
import { HeaderComponent } from "../../Components/Home-components/header/header.component";
import { TopProductsComponent } from "../../Components/Home-components/top-products/top-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSliderComponent, HeaderComponent, TopProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
