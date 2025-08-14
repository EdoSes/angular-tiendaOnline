import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailservicesService {
 
  private emailUrl = 'http://localhost:3000/api/clientes/send-email';
  
  constructor(private http: HttpClient) { }

  sendEmail(emailData: FormData): Observable<any> { 
    return this.http.post<any>(this.emailUrl, emailData); 
  }
}