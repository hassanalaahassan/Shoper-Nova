import { Component, signal, WritableSignal } from '@angular/core';
import { IProducts, IProductsResponse } from '../../shared/interfaces/products';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ImageSliderComponent } from "../../Components/Product-detailes/image-slider/image-slider.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detailes',
  standalone: true,
  imports: [ImageSliderComponent,CurrencyPipe],
  templateUrl: './product-detailes.component.html',
  styleUrl: './product-detailes.component.scss'
})
export class ProductDetailesComponent {


  product:WritableSignal<IProducts> = signal({} as IProducts)
  productId:string = ''

  constructor(private productsService:ProductsService,private activeRouter:ActivatedRoute){}


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
}
