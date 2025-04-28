import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../Components/Home-components/header/header.component";
import { ProductsService } from '../../Services/products.service';
import { IProducts, IProductsResponse } from '../../shared/interfaces/products';
import { ProductCardComponent } from "../../shared/shared-components/product-card/product-card.component";
import { SearchPipePipe } from '../../shared/Pipes/search-pipe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, ProductCardComponent,SearchPipePipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  searchTerm:string = ''
  allProducts:WritableSignal<IProducts[]> = signal([])
  responseOfProducts:WritableSignal<IProductsResponse> = signal({metadata:{numberOfPages:0}} as IProductsResponse)
  currentPage:number=0
  nextPage:number=0
  prevPage:number=0
  numOfPages:number=0

  constructor(private productsService:ProductsService){}

  ngOnInit(): void {
    this.getAllProducts()
  }


  getAllProducts():void{
    this.productsService.response.subscribe({
      next:(response:IProductsResponse)=>{
        if (response.data == undefined) {
            this.productsService.subscribeForProducts()
        }
        else{
          this.allProducts.set(response.data)
          this.responseOfProducts.set(response)
          this.setPagData()
        }
      }
    })
  }
  getNextPageProducts(page:number):void{
    this.productsService.getAllProducts(`?page=${page}`).subscribe({
      next:(response:IProductsResponse)=>{
        this.allProducts.set(response.data)
        this.responseOfProducts.set(response)
        this.setPagData()
      }
    })
  }
  setPagData():void{
    this.currentPage = this.responseOfProducts().metadata.currentPage
    this.nextPage = this.responseOfProducts().metadata.nextPage
    this.numOfPages = this.responseOfProducts().metadata.numberOfPages
  }
}
