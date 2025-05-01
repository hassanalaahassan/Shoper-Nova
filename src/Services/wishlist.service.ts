import { Injectable, signal, WritableSignal } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IWishListResponse } from '../shared/interfaces/wishlist';
import { IProducts } from '../shared/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  wishList:WritableSignal<IWishListResponse>=signal({}as IWishListResponse)
  productsIdWishList:WritableSignal<string[]>=signal([])
  wishListProducts:BehaviorSubject<IProducts[]> = new BehaviorSubject<IProducts[]>([])
  constructor(
    private clinet:ClinetApiService,
    private authService:AuthService
  ){
    this.subscribeForGetWishList()
  }

  addToWishList(id:string):Observable<any>{
    const product = {
      productId:id
    }
    const headers:HttpHeaders = new HttpHeaders({
          token:this.authService.token()
        })
    return this.clinet.postMethod('wishlist',product,headers)
  }
  removeFromWishList(id:string):Observable<any>{
    const headers:HttpHeaders = new HttpHeaders({
          token:this.authService.token()
        })
    return this.clinet.deleteMethod(`wishlist/${id}`,headers)
  }
  getWishList():Observable<any>{
    const headers:HttpHeaders = new HttpHeaders({
          token:this.authService.token()
        })
    return this.clinet.getMethod(`wishlist`,headers)
  }
  subscribeForGetWishList():void{
    this.getWishList().subscribe({
      next:(response:IWishListResponse)=>{
        this.wishList.set(response)
        this.wishListProducts.next(response.data)
        const id = response.data.map((product:IProducts)=> product._id)
        this.productsIdWishList.set(id)
      }
    })
  }
  subscribeForRemoveFromWishList(id: string): void {
    this.removeFromWishList(id).subscribe({
      next: (response) => {
        this.productsIdWishList.set(response.data);
        this.subscribeForGetWishList()
      }
    });
  }

  subscribeForAddToWishList(id: string): void {
    this.addToWishList(id).subscribe({
      next: (response) => {
          this.productsIdWishList.set(response.data);
          this.subscribeForGetWishList()
      }
    });
  }
  isProductInWishLis(id:string):boolean{
    return this.productsIdWishList().some((pId)=>pId === id)
  }
}
