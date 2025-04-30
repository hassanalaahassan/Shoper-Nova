import { Component, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../Components/Home-components/header/header.component";
import { ProductsService } from '../../Services/products.service';
import { IProducts, IProductsResponse } from '../../shared/interfaces/products';
import { ProductCardComponent } from "../../shared/shared-components/product-card/product-card.component";
import { SearchPipePipe } from '../../shared/Pipes/search-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../../shared/shared-components/modal/modal.component";
import { DropDownComponent } from "../../shared/shared-components/drop-down/drop-down.component";
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent, ProductCardComponent, SearchPipePipe, FormsModule, ModalComponent, DropDownComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  searchTerm:string = ''
  allProducts:WritableSignal<IProducts[]> = signal([])
  copyOfProducts:WritableSignal<IProducts[]> = signal([])
  responseOfProducts:WritableSignal<IProductsResponse> = signal({metadata:{numberOfPages:0}} as IProductsResponse)
  currentPage:number=0
  nextPage:number=0
  prevPage:number=0
  numOfPages:number=0
  modalVisable:boolean=false
  product:WritableSignal<IProducts>=signal({} as IProducts)

  constructor(private productsService:ProductsService,private toaster:ToastService){}

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
          this.copyOfProducts.set(response.data)
          this.responseOfProducts.set(response)
          this.setPageData()
        }
      }
    })
  }
  getNextPageProducts(page:number):void{
    this.productsService.getAllProducts(`?page=${page}`).subscribe({
      next:(response:IProductsResponse)=>{
        this.allProducts.set(response.data)
        this.responseOfProducts.set(response)
        this.setPageData()
      }
    })
  }
  setPageData():void{
    this.currentPage = this.responseOfProducts().metadata.currentPage
    this.nextPage = this.responseOfProducts().metadata.nextPage
    this.numOfPages = this.responseOfProducts().metadata.numberOfPages
  }

  productToShow(product:IProducts):void{
    this.product.set(product)
    this.modalVisable=true
  }
  closeModal(bool:boolean):void{
    this.product.set({}as IProducts)
    this.modalVisable = bool
  }
  filterProducts(filterType:string):void{
    this.allProducts.set(this.productsService.filterBy(filterType,this.copyOfProducts()))
    if(this.allProducts().length === 0){
      this.toaster.error('No Products For This Category')
      this.allProducts.set(this.copyOfProducts())
    }
    else{
      this.toaster.success(`Products Updated with ${filterType}`)
    }
  }
}
