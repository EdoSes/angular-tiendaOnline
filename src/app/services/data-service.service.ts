import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
 
  public _dataCountCart: number = 0;
 
  private dataSubject = new BehaviorSubject<any>(null);
  data$   = this.dataSubject.asObservable();

  private datasubjectValor = new BehaviorSubject<any>(null);
  data_valor$   = this.dataSubject.asObservable();

  get dataService () {
    return this._dataCountCart;
  }

  constructor() { }

  addShareData (dato:number) {
    this._dataCountCart=this._dataCountCart + 1;
  }

  
  minShareData(dato:number) {
    this._dataCountCart=this._dataCountCart - 1;
  }


  valPedShareData(dato:number) { /** Compartir el valor del pedido entre GAleria y Estiper en el cart */
   
    this.dataSubject.next(dato);
   
  }


  setData(data: any) {
    this.dataSubject.next(data);
  }

  setDatax(dataxx: any) {
    this.dataSubject.next(dataxx);
  }
 
}
