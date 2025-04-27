import { Component, OnInit } from '@angular/core';
import { SectionHeaderComponent } from "../../../shared/shared-components/section-header/section-header.component";
import { ProductsService } from '../../../Services/products.service';
import { IProducts } from '../../../shared/interfaces/products';
import { ProductCardComponent } from "../../../shared/shared-components/product-card/product-card.component";
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SectionHeaderComponent, ProductCardComponent,SlicePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {



  topProducts:IProducts[] = []


  constructor(private productsService:ProductsService){
  }


  ngOnInit(): void {
    this.getProductsFromSubject()
  }

  getProductsFromSubject():void{
    this.productsService.allProducts.subscribe({
      next:(response:IProducts[])=>{
        if(response.length === 0 ){
          this.getAllProducts()
        }
        this.topProducts = this.productsService.sortProductsByRating(response)
      }
    })
  }

  getAllProducts():void{
    this.productsService.getAllProducts().subscribe({
      next:(response)=>{
        this.productsService.allProducts.next(response.data)
      }
    })
  }
}
