import { Component } from '@angular/core';
import { CategoryHeaderComponent } from "../../Components/Category-components/category-header/category-header.component";
import { CategoryCardComponent } from "../../Components/Category-components/category/category-card.component";
import { CategoriesService } from '../../Services/categories.service';
import { ICategory } from '../../shared/interfaces/categories';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryHeaderComponent, CategoryCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  allCategories:ICategory[] = []
  constructor(private categoriesService:CategoriesService ){}
  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories():void{
    this.categoriesService.allCategories.subscribe({
      next:(response)=>{
        if (response.length === 0) {
          this.categoriesService.subscribtionAllCategories()
        }
        this.allCategories = response
      }
    })
  }
}
