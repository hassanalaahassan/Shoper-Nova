import { Component, signal, WritableSignal } from '@angular/core';
import { MainSliderComponent } from "../../Components/Home-components/main-slider/main-slider.component";
import { HeaderComponent } from "../../Components/Home-components/header/header.component";
import { TopProductsComponent } from "../../Components/Home-components/top-products/top-products.component";
import { IProducts } from '../../shared/interfaces/products';
import { ModalComponent } from "../../shared/shared-components/modal/modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSliderComponent, HeaderComponent, TopProductsComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  modalVisable:boolean=false
  product:WritableSignal<IProducts>=signal({} as IProducts)
  productToShow(product:IProducts):void{
    this.product.set(product)
    this.modalVisable=true
  }
  closeModal(bool:boolean):void{
    this.product.set({}as IProducts)
    this.modalVisable = bool
  }

}
