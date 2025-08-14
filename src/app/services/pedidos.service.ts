import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  Observable,
} from 'rxjs';

import { Factura } from '../interfaces/facturas';
import { pedidoCliente } from '../interfaces/pedidoCliente';
import { Ventas } from '../interfaces/ventas';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

   /*** 1. Servicios en ped-service.service.ts */
  baseURl_S1 = "Http://localhost:3000/api/pedidos";

  /*** 2. Servicios en pedido-cliente.service.ts */
  private baseUrl_S2 = 'http://localhost:3000/api/clientes/ped';
  private baseUr2_S2 = 'http://localhost:3000/api/clientes/pedidos';
  public  myListpedidoCliente         : pedidoCliente[]=[];
  public _pedidoCliente               : BehaviorSubject<pedidoCliente[]>;

  /*** 3. Servicios en pedido-estado-service.service.ts */
  private baseUr2_S3 = 'http://localhost:3000/api/pedido/estado';
  private baseUr3_S3 = 'http://localhost:3000/api/pedido/estadosw'
  public  estadoPedido        : pedidoCliente[]=[];
  public _estadoPedido        : BehaviorSubject<pedidoCliente[]>;

   /*** 4. Servicios en pedido-ventas.service.ts */
   public  myListVentasService : Ventas[]=[];
   myAppUrl1_S4 = 'http://localhost:3000/api/ventas/producto';
   myApiUrl2_S4 = 'http://localhost:3000/api/ventas/fechas';
   myApiUrl3_S4 = 'http://localhost:3000/api/ventas/provedor';
   myApiUrl4_S4 = 'http://localhost:3000/api/ventas/impuesto';



  constructor(private http: HttpClient) 
              {
              this._pedidoCliente =  new BehaviorSubject<pedidoCliente[]>([]),
              this._estadoPedido =  new BehaviorSubject<pedidoCliente[]>([])
              }

  /*** 1. Servicios en ped-service.service.ts */
  addPedidos(fGroupPedido : any){
    this.http.post(`${this.baseURl_S1 }`,fGroupPedido).subscribe(res=>{
    }); 
  }
  updPedidos(data : any) {
    this.http.put(`${this.baseURl_S1}`,data).subscribe(res=>{
    });
  }

  /*** 2. Servicios en pedido-cliente.service.ts */
  get pedidoCliente() {
    return this._pedidoCliente.asObservable();
  }
  getpedClienteServ(id: number): Observable<pedidoCliente[]>{
    return this.http.get<pedidoCliente[]>(this.baseUrl_S2+"/"+id)
  }
  getPedFactura(data : number): Observable<pedidoCliente[]>{
    return this.http.get<pedidoCliente[]>(this.baseUr2_S2+"/"+data)
  }

  /*** 3. Servicios en pedido-estado-service.service.ts */
  PedEstado(data : any) {
    return this.http.put(`${this.baseUr2_S3}`,data).subscribe(res=>{
    });
  }
  PedEstadosw(data:any) {
    return this.http.put(`${this.baseUr3_S3}`,data).subscribe(req=>{
    });
  }
  PostPedFactura(data:any) {
    return this.http.post(`${this.baseUr2_S3}`,data).subscribe(req=>{
    });
  }

  /*** 4. Servicios en pedido-ventas.service.ts */
  getVentaProd() :Observable<Ventas[]> { 
    return this.http.get<Ventas[]>(this.myAppUrl1_S4)
  }
  getVentaFech() :Observable<Ventas[]> { 
    return this.http.get<Ventas[]>(this.myApiUrl2_S4)
  }
  getVentaProv() :Observable<Ventas[]> { 
    return this.http.get<Ventas[]>(this.myApiUrl3_S4)
  }
  getVentaImpt() :Observable<Factura[]> { 
    return this.http.get<Factura[]>(this.myApiUrl4_S4)
  }


}
