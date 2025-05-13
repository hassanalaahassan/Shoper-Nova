import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SectionHeaderComponent } from "../../../shared/shared-components/section-header/section-header.component";
import { ProductsService } from '../../../Services/products.service';
import { IProducts, IProductsResponse } from '../../../shared/interfaces/products';
import { ProductCardComponent } from "../../../shared/shared-components/product-card/product-card.component";
import { SlicePipe } from '@angular/common';
import { WishlistService } from '../../../Services/wishlist.service';
import { IWishListResponse } from '../../../shared/interfaces/wishlist';

@Component({
  selector: 'app-top-products',
  standalone: true,
  imports: [SectionHeaderComponent, ProductCardComponent, SlicePipe],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.scss'
})
export class TopProductsComponent implements OnInit {

  @Output() modalProduct:EventEmitter<IProducts> = new EventEmitter()
  @Output() showLoader:EventEmitter<boolean> = new EventEmitter()

  topProducts:IProducts[] = []

  constructor(private productsService:ProductsService,private wishListService:WishlistService){
  }


  ngOnInit(): void {
    this.getProductsFromSubject()
  }

  getProductsFromSubject():void{
    this.showLoader.emit(true)
    this.productsService.response.subscribe({
      next:(response:IProductsResponse)=>{
        if(response.data == undefined){
          this.productsService.subscribeForProducts()
        }
        else
        {
          this.topProducts = this.productsService.sortProductsByRating(response.data)
          this.showLoader.emit(false)
        }
      }
    })
  }
  emitProductToModal(product:IProducts):void{
   this.modalProduct.emit(product)
  }

}
