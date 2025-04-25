import { Component } from '@angular/core';
import { ParentCategoryComponent } from "../../Components/subCategories-components/parent-category/parent-category.component";
import { CategoriesService } from '../../Services/categories.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ISubCategoryResponse } from '../../shared/interfaces/categories';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [ParentCategoryComponent],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent {


  categoryId:string = ''



  constructor(private categoriesService:CategoriesService,private activeRouter:ActivatedRoute){
  }


    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.getCategoryId()
      this.getSubCategories()
      this.gerPerantCategory()
    }
  getSubCategories():void{
    this.categoriesService.getSubCategoriesByPerantId(this.categoryId).subscribe({
      next:(response:ISubCategoryResponse)=>{
        console.log(response.data);
      }
    })
  }
  gerPerantCategory():void{
    this.categoriesService.findCategoryById(this.categoryId).subscribe({
      next:(response)=>{
        console.log(response);
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
