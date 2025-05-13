import { Component, signal, WritableSignal } from '@angular/core';
import { IProducts, IProductsResponse } from '../../shared/interfaces/products';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ImageSliderComponent } from "../../Components/Product-detailes/image-slider/image-slider.component";
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { ToastService } from '../../Services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detailes',
  standalone: true,
  imports: [ImageSliderComponent,CurrencyPipe,FormsModule],
  templateUrl: './product-detailes.component.html',
  styleUrl: './product-detailes.component.scss'
})
export class ProductDetailesComponent {


  product:WritableSignal<IProducts> = signal({} as IProducts)
  productId:string = ''
  addToCart:WritableSignal<boolean> = signal(false)
  quantity:WritableSignal<number> = signal(0)

  constructor(
    private productsService:ProductsService
    ,private activeRouter:ActivatedRoute
    ,private cartService:CartService
    ,private toaster:ToastService
  )
  {}


  ngOnInit(): void {
    this.getProductDetailes()
  }
  getProductDetailes():void{
    this.getProductId()
    this.productsService.response.subscribe({
      next:(response:IProductsResponse)=>{
        const product = this.productsService.getProductById(response.data, this.productId);
        if (product) {
          this.product.set(product);
        } else {
          console.error('Product not found for ID:', this.productId);
        }

      }
    })
  }
  getProductId():void{
      this.activeRouter.paramMap.subscribe({
        next: (params) => {
            this.productId = params.get('id') || '';
        }
      });
  }
  showQuantity():void{
    this.addToCart.set(!this.addToCart())
  }
  incremant():void{
    this.quantity.set(this.quantity() + 1)
  }
  decremant():void{
    this.quantity.set(this.quantity() - 1)
  }
  addProductToCart():void{
    if(this.quantity()>0){
      this.cartService.addItemWithQuantity(this.product()._id,this.quantity())
      this.showQuantity()
    }
    else{
      this.toaster.error('Quantity Must Be More Than 0')
    }
  }

}
