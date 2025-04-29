import { Component, Input } from '@angular/core';
import { IProducts } from '../../interfaces/products';
import { ICartProduct } from '../../interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss'
})
export class CartCardComponent {

  constructor(private cartSevice:CartService){}

  @Input() product:ICartProduct = {} as ICartProduct


  updateQuantity(newQuantity:number):void{
    this.cartSevice.subscribtionForUpdateQuantity(this.product.product._id,newQuantity)
  }

}
