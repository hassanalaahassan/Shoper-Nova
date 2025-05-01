import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../Components/Home-components/header/header.component";
import { WishlistService } from '../../Services/wishlist.service';
import { ProductsService } from '../../Services/products.service';
import { IProducts, IProductsResponse } from '../../shared/interfaces/products';
import { ProductCardComponent } from "../../shared/shared-components/product-card/product-card.component";
import { ModalComponent } from "../../shared/shared-components/modal/modal.component";

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [HeaderComponent, ProductCardComponent, ModalComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {

  wishListProducts:WritableSignal<IProducts[]> = signal([])
  product:WritableSignal<IProducts>=signal({} as IProducts)
  modalVisable:boolean=false

  constructor(private wishlistService:WishlistService){}

  ngOnInit(): void {
    this.getWishListProducts()
  }
  getWishListProducts():void{
    this.wishlistService.subscribeForGetWishList()
    this.wishlistService.wishListProducts.subscribe({
      next:(response:IProducts[])=>{
        this.wishListProducts.set(response)
      }
    })
  }
  productToShow(product:IProducts):void{
    this.product.set(product)
    this.modalVisable=true
  }
  closeModal(bool:boolean):void{
    this.product.set({}as IProducts)
    this.modalVisable = bool
  }

}
