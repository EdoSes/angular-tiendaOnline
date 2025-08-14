import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService02Service {

  private dataSubject = new BehaviorSubject<any>(null);
  data$     = this.dataSubject.asObservable();

  private dataSubject03 = new BehaviorSubject<any>(null);
  data03$   = this.dataSubject03.asObservable();

  private dataSubjOpcion = new BehaviorSubject<any>(null);
  dataOpcion$   = this.dataSubjOpcion.asObservable();

  private dataSubjEmail = new BehaviorSubject<any>(null);
  dataOpcionEmail$   = this.dataSubjEmail.asObservable();

  constructor() { }

  setDataS02(data: any) {
    this.dataSubject.next(data);
  }

  setDataS03(data: any) {
    //console.log("link  servi setDatas03",data)
    this.dataSubject03.next(data);
  }

  setDataOpcMnu(data:string) {
    this.dataSubjOpcion.next(data);
  }

  dataSendEmail(data:string) {
    this.dataSubjEmail.next(data);
  }



}




