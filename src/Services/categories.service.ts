import { Injectable } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategory, ICategoryResponse } from '../shared/interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  allCategories:BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([])


  constructor(private clinetApiService:ClinetApiService) { }
  getAllCategories():Observable<any>{
      return this.clinetApiService.getMethod('categories')
  }
  subscribtionAllCategories():void {
    this.getAllCategories().subscribe({
      next: (response: ICategoryResponse) => {
        this.allCategories.next(response.data)
        console.log(response.data);

      }
    });
  }
}
