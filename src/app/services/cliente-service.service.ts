import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

import { Cliente } from '../interfaces/clientes';
import { pedidoCliente } from '../interfaces/pedidoCliente';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})

export class ClienteServiceService {
  
  private baseUrl = 'http://localhost:3000/api/clientes';
  private baseUr2 = 'http://localhost:3000/api/clientes/id';
  private baseUr3 = 'http://localhost:3000/api/clientes/update';
  private baseUr4 = 'http://localhost:3000/api/clientes/usr';
  private baseUr5 = 'http://localhost:3000/api/registro/cliente'
  private baseUr6 = 'http://localhost:3000/api/delete/cliente'

  public _cliente!              : BehaviorSubject<Cliente[]>;
  public _usuario!              : BehaviorSubject<Users[]>;


  constructor(private http: HttpClient) {
    this._cliente =  new BehaviorSubject<Cliente[]>([]);
    this._usuario =  new BehaviorSubject<Users[]>([]);
  }

  get cliente() {
    return this._cliente.asObservable();
  }


  addClientes (formLog : FormGroup):Observable<any> {
    return this.http.post<FormData>(`${this.baseUrl}`,formLog.value)
  }

  getCliente(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseUrl)
  }

  getVerifyCliente(email :any): Observable<Cliente[]> {
    //console.log("service  getVerifyCliente ",email)
    return this.http.get<Cliente[]>(this.baseUrl+"/"+email)
  }
  
  getVerifyUser(email :any): Observable<Cliente[]>{
    //console.log("service getVerifyUser ",email)
    return this.http.get<Cliente[]>(this.baseUr4+"/"+email)
  }
  getClienteid(id :number): Observable<pedidoCliente[]>{
   return this.http.get<pedidoCliente[]>(this.baseUr2+"/"+id)
  }

  updClienteid(file:FormGroup)  {
    return this.http.put(`${this.baseUr3}`,file.value).subscribe(req=>{
    });
  }

  getClienteReg(): Observable<Users[]>{
    return this.http.get<Users[]>(`${this.baseUr5}`)
   }

   delClienteReg(id:any): Observable<Users[]>{
    const url = this.baseUr6+"/"+id;
    console.log(url)
    return this.http.delete<Users[]>(`${this.baseUr6}`)
   }




}


