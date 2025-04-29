import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../interfaces/products';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Output() showProduct:EventEmitter<IProducts> = new EventEmitter()
  @Input() product:IProducts = {} as IProducts

  constructor(private cartService:CartService){}
  addItemToCart():void{
    this.showProduct.emit(this.product)
  }


}
