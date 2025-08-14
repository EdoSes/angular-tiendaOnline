import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { Producto } from '../../interfaces/producto';
import { cartService } from '../../services/cart-service';
import { DataServiceService } from '../../services/data-service.service';
import { VisibilidadService } from '../../services/visibilidad-service';

@Component({
  selector: 'app-stepper',
   standalone: true,
  imports: [
    CommonModule, 
    MatStepperModule,
    MatIconModule,         // para <mat-icon>
    MatBadgeModule,        // para [matBadge], matBadgePosition, matBadgeColor
    MatTooltipModule       // para matTooltip
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  
  isLinear = true;
  public badgeContent        : number  = 0;
  public badges              : number  = 0;
  public name                : number  = 0;
  public valorCartProductos  : number  = 0;
  public valorPed            : number  = 0;
  public valorItem           : number  = 0;
  public productos           : Producto[]=[]; 
  
  

  constructor(private _formBuilder: FormBuilder,
             public _dataSerCount   : DataServiceService,
             private router         : Router,
             private snackBar       : MatSnackBar,
             private visible_srv    : VisibilidadService,
             public  myListProd     : cartService 
  ) {}

  ngOnInit(): void {
    this.obtenerProducto()
  }

  obtenerProducto() {
    this.myListProd._product.subscribe(producto => {
      this.productos   = producto;
      this.valorPed = 0
      //* Recorrer la Lista para obtener el Valor del Pedido
      for (let index  = 0; index < Object.keys(this.productos).length; index++) {
        const producto = this.productos[index]
        if (producto.promocionProducto > 0 ) {
          const precioProducto = ((producto.precioProducto-((producto.precioProducto*producto.promocionProducto)/100))*producto.cantidadProducto)         
          this.valorItem = precioProducto;
        }
        else { 
          this.valorItem = producto.cantidadProducto*producto.precioProducto;
        }
        this.valorPed  = this.valorPed +  this.valorItem
      }
      this._dataSerCount.valPedShareData(this.valorPed)
    });
    
  }

  checkOut() {
   
    if (this._dataSerCount._dataCountCart > 0) {
      this._dataSerCount.setData("CheckOut")
      this.visible_srv.mostrarComponente()
    }
    else {
      this.showSnackbar("No Hay Items elegidos",  'Cerrar')
      return
    }
   
  }

  shippingPed() {
    this._dataSerCount.setData("Shipping")
    this.visible_srv.mostrarComponente()
  }




  showSnackbar(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000, // Duration in milliseconds
    });
  }

}
