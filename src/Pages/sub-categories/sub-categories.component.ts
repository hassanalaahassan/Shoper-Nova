import { Component, OnInit } from '@angular/core';
import { ParentCategoryComponent } from "../../Components/subCategories-components/parent-category/parent-category.component";
import { CategoriesService } from '../../Services/categories.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ICategory, ISubcategory, ISubCategoryResponse } from '../../shared/interfaces/categories';
import { SubCategoryComponent } from "../../Components/subCategories-components/sub-category/sub-category.component";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [ParentCategoryComponent, SubCategoryComponent,TitleCasePipe],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent implements OnInit {


  categoryId:string = ''
  perantCategory:ICategory = {} as ICategory
  allSubCategories:ISubcategory[] = []
  isHide:boolean = true



  constructor(private categoriesService:CategoriesService,private activeRouter:ActivatedRoute){}

    ngOnInit(): void {
      this.getCategoryId()
      this.getSubCategories()
      this.gerPerantCategory()
    }
    getSubCategories():void{
      this.categoriesService.getSubCategoriesByPerantId(this.categoryId).subscribe({
        next:(response:ISubCategoryResponse)=>{
          this.allSubCategories = response.data
          this.isHide = false
        }
      })
    }
    gerPerantCategory():void{
      this.categoriesService.findCategoryById(this.categoryId).subscribe({
        next:(response)=>{
          if (response) {
            this.perantCategory = response;
          }
        }
      })
    }
    getCategoryId(): void {
      this.activeRouter.paramMap.subscribe({
        next: (params) => {
            this.categoryId = params.get('id') || '';
        }
      });
    }


}
