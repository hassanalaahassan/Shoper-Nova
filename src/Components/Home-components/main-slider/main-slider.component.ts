import { Component, EventEmitter, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CategoriesService } from '../../../Services/categories.service';
import { ICategory } from '../../../shared/interfaces/categories';
import { SectionHeaderComponent } from "../../../shared/shared-components/section-header/section-header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CarouselModule, ButtonModule, SectionHeaderComponent, RouterModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent {
  @Output() showLoader:EventEmitter<boolean> = new EventEmitter()

  allCategories:ICategory[] = []
  responsiveOptions = [
    {
        breakpoint: '1446px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '1026px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '400px',
        numVisible: 1,
        numScroll: 1
    }
  ];

  constructor(private categoriesService:CategoriesService) {}

  ngOnInit() {
    this.getAllCategoties()
  }

  getAllCategoties():void{
    this.showLoader.emit(true)
    this.categoriesService.allCategories.subscribe({
      next:(response)=>{
        if(response.length === 0){
          this.categoriesService.subscribtionAllCategories()
        }
        else{
          this.showLoader.emit(false)
         this.allCategories = response
        }
      }
    })

  }
}
