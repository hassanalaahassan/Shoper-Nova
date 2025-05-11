import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../Components/Home-components/header/header.component";
import { ICart, ICartProduct } from '../../shared/interfaces/cart';
import { CartService } from '../../Services/cart.service';
import { CartCardComponent } from "../../shared/shared-components/cart-card/cart-card.component";
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, CartCardComponent,CurrencyPipe,DatePipe,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {


  constructor(public cartService:CartService){
  }

  clearCart():void{
    this.cartService.subscribtionForDeleteCart()
  }

}
