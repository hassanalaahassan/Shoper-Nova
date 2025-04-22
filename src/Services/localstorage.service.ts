import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setItemIntoLocalStorage(key:string,value:any):void{
    localStorage.setItem(key,JSON.stringify(value))
  }
  getItemIntoLocalStorage(key:string):any{
    return JSON.parse(localStorage.getItem(key)!)
  }
  removeItemFormLocalStorage(key:string):any{
    localStorage.removeItem(key)
  }
}
