import { Injectable } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts, IProductsResponse } from '../shared/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // allProducts:BehaviorSubject<IProducts[]> = new BehaviorSubject<IProducts[]>([])
  response:BehaviorSubject<IProductsResponse> = new BehaviorSubject<IProductsResponse>({} as IProductsResponse)

  constructor(private clinetApiService:ClinetApiService) {}

  getAllProducts(params = ''):Observable<any>{
    return this.clinetApiService.getMethod(`products${params}`)
  }
  subscribeForProducts():void{
    this.getAllProducts().subscribe({
      next:(response:IProductsResponse)=>{
        this.response.next(response)
      }
    })
  }
  sortProductsByRating(products:IProducts[]):IProducts[]{
    return products.sort((a,b)=> b.ratingsAverage - a.ratingsAverage)
  }
  getProductById(products:IProducts[],id:string):IProducts|undefined{
    return products.find((product)=> product._id === id)
  }

}
