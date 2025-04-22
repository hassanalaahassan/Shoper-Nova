import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CategoriesService } from '../../../Services/categories.service';
import { ICategory } from '../../../shared/interfaces/categories';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CarouselModule,ButtonModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.scss'
})
export class MainSliderComponent {

  allCategories:ICategory[] = []

  responsiveOptions = [
    {
        breakpoint: '1446px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '1026px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '872px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
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
    this.categoriesService.subscribtionAllCategories()
    this.categoriesService.allCategories.subscribe({
      next:(response)=>{
         this.allCategories = response
      }
    })

  }
}
