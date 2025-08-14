import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Documentos } from '../interfaces/documentos';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  baseURl = "Http://localhost:3000/api/documentos";

  constructor(private httpclient: HttpClient) { 

  }

  getDocumentos(id: number): Observable<Documentos[]> {
      return this.httpclient.get<Documentos[]>(this.baseURl+"/"+id)
  }



}
