import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesServiceService {

  public  _mensaje : string = "";

  constructor() { }

  get mensajesService () {
    return this._mensaje;
  }


}


   