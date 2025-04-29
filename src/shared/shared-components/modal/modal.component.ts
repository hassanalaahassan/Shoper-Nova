import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { IProducts } from '../../interfaces/products';
import { CartService } from '../../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../Services/toast.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  quantity:WritableSignal<number>=signal(0)
  constructor(private cartService:CartService,private toaster:ToastService){}

  @Input() product:IProducts = {} as IProducts

  @Input() visible: boolean = false;

  @Output() closed:EventEmitter<boolean> = new EventEmitter()

  closeDialog():void{
    this.quantity.set(0)
    this.closed.emit(false)
  }
  incremant():void{
    this.quantity.set(this.quantity() + 1)
  }
  decremant():void{
    this.quantity.set(this.quantity() - 1)
  }
  addProductToCart():void{
    if(this.quantity()>0){
      this.cartService.addItemWithQuantity(this.product._id,this.quantity())
      this.closeDialog()
    }
    else{
      this.toaster.error('Quantity Must Be More Than 0')
    }
  }
}
