import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../interfaces/products';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../Services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,NgOptimizedImage],
templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Output() showProduct:EventEmitter<IProducts> = new EventEmitter()
  @Input() product:IProducts = {} as IProducts
  @Input() isInWishList:boolean = false

  constructor(public wishlistService:WishlistService){

  }

  addItemToCart():void{
    this.showProduct.emit(this.product)
  }
  addItemToWishList(id:string):void{
    this.wishlistService.subscribeForAddToWishList(id)
  }
  removeItemFromWishList(id:string):void{
    this.wishlistService.subscribeForRemoveFromWishList(id)
  }
}
