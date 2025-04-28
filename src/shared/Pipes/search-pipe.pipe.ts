import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/products';

@Pipe({
  name: 'searchPipe',
  standalone: true
})
export class SearchPipePipe implements PipeTransform {

  transform(products:IProducts[],searchText: string): IProducts[] {
    searchText = searchText.toLowerCase();

    return products.filter(product => {
      return product.title.toLowerCase().includes(searchText);
    });
  }

}
