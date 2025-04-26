import { Component, Input } from '@angular/core';
import { ISubcategory } from '../../../shared/interfaces/categories';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent {


  @Input() subCategory:ISubcategory = {} as ISubcategory

}
