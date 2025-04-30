import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../Services/categories.service';
import { ICategory } from '../../interfaces/categories';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent implements OnInit {

  allCategories:WritableSignal<ICategory[]> = signal([])

  constructor(private categoriesService:CategoriesService){}

  isDropDownShow:WritableSignal<boolean> = signal(false)
  isInsideDropDownShow:WritableSignal<boolean> = signal(false)
  @Output() filtertion:EventEmitter<string>= new EventEmitter()


  ngOnInit(): void {
      this.getCategories()
  }

  toggleDropDown():void{
    this.isDropDownShow.set(!this.isDropDownShow())
    if (!this.isDropDownShow()) {
      this.isInsideDropDownShow.set(false)
    }
  }
  toggleInsideDropDown():void{
    if (this.isDropDownShow()) {
      this.isInsideDropDownShow.set(!this.isInsideDropDownShow())
    }
  }
  selectedValue(filterBy:string):void{
    this.isDropDownShow.set(false)
    this.isInsideDropDownShow.set(false)
    this.filtertion.emit(filterBy)
  }
  getCategories():void{
    this.categoriesService.allCategories.subscribe({
      next:(response:ICategory[])=>{
        if (response.length ==0) {
          this.categoriesService.subscribtionAllCategories()
        }
        this.allCategories.set(response)
      }
    })
  }


}
