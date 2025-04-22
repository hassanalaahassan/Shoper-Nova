import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinetApiService {

  constructor(private http:HttpClient) { }

  postMethod(restOfApi:string,body:any):Observable<any>{
    return this.http.post(`${Api.url}${restOfApi}`,body)
  }
  getMethod(restOfApi:string,headers?:HttpHeaders):Observable<any>{
    if(headers){
      return this.http.get(`${Api.url}${restOfApi}`,{
        headers
      })
    }
      else{
        return this.http.get(`${Api.url}${restOfApi}`)
      }
  }
  deleteMethod(restOfApi:string):Observable<any>{
    return this.http.delete(`${Api.url}${restOfApi}`)
  }
  putMethod(restOfApi:string,body:any):Observable<any>{
    return this.http.put(`${Api.url}${restOfApi}`,body)
  }
}
