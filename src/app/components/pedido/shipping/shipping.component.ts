import {
  CommonModule,
  DecimalPipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { pedidoCliente } from '../../../interfaces/pedidoCliente';
import {
  ClienteServiceService,
} from '../../../services/cliente-service.service';
import { DataService02Service } from '../../../services/data-service02.service';
import { PedidosService } from '../../../services/pedidos.service';
import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe, // <-- importa la pipe number
    MatIconModule, // <-- aquí
    MatTooltipModule // <-- si usas matTooltip
    ,
    SeccionDeTitulosComponent
],

  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingComponent {
 
  divShipping     : boolean = false;

  pedcliente      : pedidoCliente[]=[];
  pedclienteid    : pedidoCliente[]=[];
  listuser        : any;

  valortotal      : number=0;
  CanItem         : number=0;
  emailFind       : string="";



constructor (public  myListpedidoCliente  : PedidosService,
            public  _dataSer02            : DataService02Service,
            private _cliente              : ClienteServiceService,
            private router                : Router,
) {

} 

ngOnInit() {
  this._dataSer02.dataOpcionEmail$.subscribe(email => { 
    this.emailFind = email; 
    //console.log(this.emailFind)
  });
  this.miPedido()
}

async miPedido() {
 
    const dataUser = await  firstValueFrom(this._cliente.getVerifyUser(this.emailFind))
    this.listuser = dataUser || [];
    if((dataUser) && (Object.keys(this.listuser).length != 0)){
      this.myListpedidoCliente.getpedClienteServ(this.listuser[0].id).subscribe(pedcliente => {
      this.pedcliente = pedcliente
      //console.log(pedcliente)
      this.divShipping = true;
      this.pedcliente.map(pedcliente => ({ 
        ...pedcliente, 
            pagoPedido    : pedcliente.pagoPedido     || { pago     : false}, 
            anulaPedido   : pedcliente.anulaPedido    || { anula    : false},
            tramitePedido : pedcliente.tramitePedido  || {tramitado : false}
          }
      ));
      let idpedido        = {idPedido   :this.pedcliente[0].idPedido}
    });
  }
}

getidPedido (id:any) {
    const numPedSearch = id
    this.myListpedidoCliente.getPedFactura(numPedSearch).subscribe(pedclienteid => {
      this.pedclienteid = pedclienteid;
      if (!this.pedclienteid) {
        window.location.reload();
      }
      else {
        for (let index = 0; index < Object.keys(this.pedclienteid).length; index++) {
          const pedcliente   = this.pedclienteid[index]        
          this.valortotal    =  this.valortotal + pedcliente.cantidadPedido*pedcliente.precioPedido;
          this.CanItem       =  this.CanItem    + pedcliente.cantidadPedido;
        }   
      }
    });
}

toggleOverlay() {
    
    this.divShipping = false;
    this.router.navigate(['/productos/galeria']); 
    //window.location.reload();
}


onCheckboxChange(event: any, obj: any, condicion: string) {
    
  if (obj && condicion === "pagoPedido") {
    obj.pagoPedido = event.target.checked;
  }
  if (obj && condicion ==="tramitePedido") {
   obj.tramitePedido =  event.target.checked; 
  }
  if (obj && condicion==="anulaPedido") {
    obj. anulaPedido =  event.target.checked; 
  }
  //this.estadoPedidoSer.PedEstado(obj) 

}


}
