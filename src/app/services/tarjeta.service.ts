import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../enviroment/enviroment';
import { tarjetas } from '../interfaces/tarjetas';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

 
  URL_API: string = environment.API_CARD;

  constructor(private httpClient: HttpClient) {

  }

  getCards(): Observable<tarjetas[]> {
    return this.httpClient.get<tarjetas[]>(this.URL_API + '/list').pipe(map(res => res));
  }

  saveCard(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/save', request).pipe(map(resp => resp));
  }

  updateCard(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API + '/update', request).pipe(map(resp => resp));
  }

  deleteCard(id: number): Observable<any> {
    return this.httpClient.get<any>(this.URL_API + '/delete/' + id).pipe(map(resp => resp));
  }


}
