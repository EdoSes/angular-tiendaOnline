import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { DataServiceService } from '../../../services/data-service.service';

@Component({
  selector: 'app-paypal',
    standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent {
  @ViewChild("paymentRef", {static: true }) paymentRef!: ElementRef;
  payment: any;
  ruoter: any;
  details:any
  
  // Declaramos la variable que recibirá la variable enviada por el padre 
   @Input() valorPed_pas  :any    = 0

   constructor(private router      : Router, 
               private dataService : DataServiceService,
              ) { }

  ngOnInit(): void {
      //console.log("Valor Pedido   ",this.valorPed_pas)
     
       window.paypal.Buttons({
           style: {
               layout: "horizontal",
               Color: "blue",
               shape: "rect",
               label: "paypal",
           },
           createOrder: (data:any,actions:any) => {
               return actions.order.create({
                    purchase_units : [
                       {
                           amount : {
                              value: this.valorPed_pas.toString(),
                               currency_code : "USD"
                           }
                       }
                    ]   
               });
           },
           onApprove : (data: any, actions:any) => { 
              return actions.order.capture().then((details:any )  => {
              //console.log('onApprove', details);
              //console.log('Transacción', details.id);
              const sendData = details.id
              this.dataService.setData(sendData)
              this.router.navigate(["/pedidos/confirm"]);   
                 
               });
           },
           onClientAuthorization: (data: any) => {
              //console.log('Transacción autorizada', data);
           },
           onCancel: (data : any, actions: any) => {
            //console.log('Transacción cancelada', data);
           },  
           onClick: (data : any, actions: any) => {
            //console.log('Botón de PayPal clickeado', data);
           },
           onError : (error: any)  => {
            //console.log('Transacción cancelada',error);
           }

       }).render(this.paymentRef.nativeElement)
  
   }
}



//Cliente ID
//AVPxImo9GmL4gdWrhfShYRsRdzH3RtnNttvu8I0PLhACWpt1z-Od1INKaa9EEX0KPXJx4Jz8gKiRoRou

//Af6xcY6ZJKmNwisrQTQxFFWK8bkC7J73aa5iNf3ZCC92N42Vb1kTqILA6tgwiiMpva_Pr2fTZzdBZGPu

//secret Key 1
//EMX8UhsrkkWvDeuUvoE5dQyrMMp_26wVY5xDvvzBclc7UvNhtdTAwWxpRh04EZ1Du2UnJ-HI2Dfo2vr8

// sanbox URL
// https://sandbox.paypal.com

// Email
//sb-gf5xq33345743@business.example.com
//PASS
//vR!$x}2P



//https://sandbox.paypal.com







