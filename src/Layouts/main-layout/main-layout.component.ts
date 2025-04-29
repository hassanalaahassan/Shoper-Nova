import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../../shared/shared-components/side-bar/side-bar.component";
import { CartService } from '../../Services/cart.service';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  constructor(private cartService:CartService){}

  ngOnInit(): void {
    this.getCart()
  }
  getCart():void{
    if(this.cartService.currentCart()._id === undefined){
      this.cartService.subscribtionUserCart()
    }
  }
}
