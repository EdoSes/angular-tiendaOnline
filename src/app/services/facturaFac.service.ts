import {
  HttpClient,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class facturaFacService {
    
    private baseUrl = 'http://localhost:3000/api/facturas/factura';

  
    constructor(private http: HttpClient,
      private snackBar: MatSnackBar
    ) {}
 
    postfacturaFac(file: File, data: any) : Observable<HttpEvent<any>>{
      const formData: FormData = new FormData();
      const pedido = data.idPedido[0]
      const valor  = data.valor
      const cadena= file.name.slice(0, ((file.name.length) - 4))
      if (cadena != pedido) {
        this.snackBar.open("Error...Seleccione el Archivo que Corresponde al # de FACTURA", "", {
          duration: 5000,
          //horizontalPosition: "start",
          //verticalPosition: "",
        }); 
         window.history.back();
      }  
      formData.append('file',   file, file.name);
      formData.append('pedido', pedido);
      formData.append('valor',  valor);
      //console.log("post de servioc", formData.get("file"))
      const req = new HttpRequest('POST', `${this.baseUrl}`,formData,  {
        responseType: 'json'
      });
  
      return this.http.request(req);
    }

     pdfgetFiles(): Observable<any> {
       return this.http.get(`${this.baseUrl}`);
     }

    }




  
  