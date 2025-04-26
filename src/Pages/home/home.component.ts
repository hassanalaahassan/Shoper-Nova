import { Component } from '@angular/core';
import { MainSliderComponent } from "../../Components/Home-components/main-slider/main-slider.component";
import { HeaderComponent } from "../../Components/Home-components/header/header.component";
import { ProductsComponent } from "../../Components/Home-components/products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSliderComponent, HeaderComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
