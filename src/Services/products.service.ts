import { Injectable } from '@angular/core';
import { ClinetApiService } from './clinet-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private clinetApiService:ClinetApiService) { }
  

}
