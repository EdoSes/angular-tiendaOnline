import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../enviroment/enviroment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProdServiceService {
  private myAppUrl: string;
  private myApiUrl: string;

  baseURl = "Http://localhost:3000/api/productos";

  constructor(private httpclient: HttpClient) {
    this.myAppUrl = environment.endPoint;
    this.myApiUrl = "/api/productos"
   }

   getProductos(): Observable<Producto[]>{
    return this.httpclient.get<Producto[]>(this.myAppUrl+this.myApiUrl)
   }

   
   deleteProductos(id :number): Observable<void>{
    return this.httpclient.delete<void>(this.myAppUrl+this.myApiUrl+"/"+id)
   }


   addProductos(producto: Producto): Observable<Producto[]>{
    return this.httpclient.post<Producto[]>(this.myAppUrl+this.myApiUrl, producto)
   }

   getProducto (id: number): Observable<Producto> {
    return this.httpclient.get<Producto>(this.myAppUrl+this.myApiUrl+"/"+id)
   }
   
   updateProducto (id: number, producto: Producto): Observable<void> {
    return this.httpclient.put<void>(this.myAppUrl+this.myApiUrl+"/"+id, producto)
   }


    upLoad (formData : FormData):Observable<any> {
    return this.httpclient.post<FormData>(this.baseURl,formData);
  }
}

