import { Injectable } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts, IProductsResponse } from '../shared/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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
    return [...products].sort((a,b)=> b.ratingsAverage - a.ratingsAverage)
  }
  getProductById(products:IProducts[],id:string):IProducts|undefined{
    return products.find((product)=> product._id === id)
  }
  filterBy(filterType:string,products:IProducts[]):IProducts[]{
    if (filterType == 'highPrice') {
      return this.sortProductsByHighPrice(products)
    }
    else if(filterType == 'lowPrice'){
      return this.sortProductsByLowPrice(products)
    }
    else if(filterType == 'topRate'){
      return this.sortProductsByRating(products)
    }
    else if(filterType == 'topRate'){
      return this.sortProductsByRating(products)
    }
    else{
      return this.filterByCategory(filterType,products)
    }
  }
  sortProductsByHighPrice(products:IProducts[]):IProducts[]{
    return [...products].sort((a,b)=> b.price - a.price)
  }
  sortProductsByLowPrice(products:IProducts[]):IProducts[]{
    return [...products].sort((a,b)=> a.price - b.price)
  }
  filterByCategory(category:string,products:IProducts[]):IProducts[]{
    return [...products].filter((product)=> product.category.name === category)
  }


}
