import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../../shared/shared-components/side-bar/side-bar.component";
import { CategoriesService } from '../../Services/categories.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ RouterOutlet, SideBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
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
      }
    })
  }
}
