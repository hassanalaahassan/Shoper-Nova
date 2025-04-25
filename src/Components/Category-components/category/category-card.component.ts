import { Component, Input } from '@angular/core';
import { ICategory } from '../../../shared/interfaces/categories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

  @Input({required:true}) category:ICategory = {} as ICategory




}
