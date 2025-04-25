import { Injectable } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICategory, ICategoryResponse, ISubcategory, ISubCategoryResponse } from '../shared/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  allCategories:BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([])
  subCategories:BehaviorSubject<ISubcategory[]> = new BehaviorSubject<ISubcategory[]>([])


  constructor(private clinetApiService:ClinetApiService) { }
  getAllCategories():Observable<any>{
      return this.clinetApiService.getMethod('categories')
  }
  getSubCategoriesByPerantId(id:string):Observable<any>{
      return this.clinetApiService.getMethod(`categories/${id}/subcategories`)
  }
  subscribtionAllCategories():void {
    this.getAllCategories().subscribe({
      next: (response: ICategoryResponse) => {
        this.allCategories.next(response.data)
      }
    });
  }
  findCategoryById(id:string):Observable<ICategory | undefined>{
    return this.allCategories.pipe(
       map((response:ICategory[])=> response.find((category)=> category._id == id))
      )
    }
  }
  // subscribtionSubCategoriesByPerantId(id:string):void {
  //   this.getSubCategoriesByPerantId(id).subscribe({
  //     next: (response: ISubCategoryResponse) => {
  //       this.subCategories.next(response.data)
  //     }
  //   });
  // }



