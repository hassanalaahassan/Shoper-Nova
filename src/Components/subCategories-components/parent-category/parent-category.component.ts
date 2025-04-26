import { Component, Input } from '@angular/core';
import { ICategory } from '../../../shared/interfaces/categories';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-category',
  standalone: true,
  imports: [],
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.scss'
})
export class ParentCategoryComponent {


  @Input() parentCategory:ICategory = {} as ICategory



  constructor(private router:Router){}


  backToCategories():void{
    this.router.navigateByUrl('/categories')
  }
}
