import {
  HttpClient,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  /** 1. File Upload - Cargar Productos file-upload.service.ts */
  private baseUrl = 'http://localhost:3000/api/productos/img';

  /** 2. PDF Upload - Cargar Productos pdf-upload.service.ts */
  private baseURl_S2 = "Http://localhost:3000/api/invoice";

  constructor(private http: HttpClient) {}

  /** 1. File Upload - Cargar Productos file-upload.service.ts */
  upload(file: File): Observable<HttpEvent<any>> {
    
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('nombreProducto', "Sin definir");
    //console.log('form data - ' + JSON.stringify(formData));
    //debugger
    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  /** 2. PDF Upload - Cargar Productos pdf-upload.service.ts */
  uploadPDF(file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const req = new HttpRequest('POST',`${this. baseURl_S2}`, formData,  {
        responseType: 'json'
    });
    return this.http.request(req);
  }

  pdfgetFiles(): Observable<any> {
    return this.http.get(`${this. baseURl_S2}`);
  }



}
