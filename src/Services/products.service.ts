import { Injectable } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProducts } from '../shared/interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  allProducts:BehaviorSubject<IProducts[]> = new BehaviorSubject<IProducts[]>([])

  constructor(private clinetApiService:ClinetApiService) {
    this.getAllProducts().subscribe({
      next:(val)=>{
        this.allProducts.next(val.data)
      }
    })
  }

  getAllProducts(params = ''):Observable<any>{
    return this.clinetApiService.getMethod(`products${params}`)
  }
  sortProductsByRating(products:IProducts[]):IProducts[]{
    return products.sort((a,b)=> b.ratingsAverage - a.ratingsAverage)
  }
  getProductById(products:IProducts[],id:string):IProducts|undefined{
    return products.find((product)=> product._id === id)
  }

}
