import { Injectable, signal, WritableSignal } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';
import { ICart, ICartResponse } from '../shared/interfaces/cart';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private clinet:ClinetApiService,private authService:AuthService,private toaster:ToastService){}
  public currentCart:WritableSignal<ICart> = signal({} as ICart)
  public cartResponse:WritableSignal<ICartResponse> = signal({} as ICartResponse)

  getUserCart():Observable<any>{
   const headers:HttpHeaders = new HttpHeaders({
      token:this.authService.token()
    })
    return this.clinet.getMethod('cart',headers)
  }
  subscribtionUserCart():void{
    this.getUserCart().subscribe({
      next:(response:ICartResponse)=>{
        this.cartResponse.set(response)
        this.currentCart.set(response.data)
      }
    })
  }
  addNewItemToCart(proId:string):Observable<any>{
    const headers:HttpHeaders = new HttpHeaders({
      token:this.authService.token()
    })
    return this.clinet.postMethod('cart',{productId:proId},headers)
  }
  updateQuantity(proId:string,quantity:number):Observable<any>{
    const headers:HttpHeaders = new HttpHeaders({
      token:this.authService.token()
    })
   return this.clinet.putMethod(`cart/${proId}`,{count:`${quantity}`},headers)
  }
  clearUserCart():Observable<any>{
    const headers:HttpHeaders = new HttpHeaders({
      token:this.authService.token()
    })
    return this.clinet.deleteMethod('cart',headers)
  }
  addItemWithQuantity(proId:string,quantity:number):void{
    this.subscribtionForAddProduct(proId,quantity)
  }
  subscribtionForAddProduct(proId:string,quantity:number):void{
    this.addNewItemToCart(proId).subscribe({
      next:(response)=>{
        this.subscribtionForUpdateQuantity(proId,quantity)
      }
    })
  }
  subscribtionForUpdateQuantity(proId:string,quantity:number):void{
    this.updateQuantity(proId,quantity).subscribe({
      next:(response:ICartResponse)=>{
        this.toaster.success('Cart Updated Successfully')
        this.cartResponse.set(response)
        this.currentCart.set(response.data)
      }
    })
  }
  subscribtionForDeleteCart():void{
    this.clearUserCart().subscribe({
      next:(response:any)=>{
        this.cartResponse.set({}as ICartResponse)
        this.currentCart.set({} as ICart)
      }
    })
  }


}
