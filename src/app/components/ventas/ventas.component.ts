// src/app/ventas/ventas.component.ts

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { Factura } from '../../interfaces/facturas';
import { Ventas } from '../../interfaces/ventas';
import { PedidosService } from '../../services/pedidos.service';
import {
  SeccionDeTitulosComponent,
} from '../shared-app/title-section/title-section';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    SeccionDeTitulosComponent,
    RouterModule
  ],
  // Eliminar la propiedad 'template' si ya tienes 'templateUrl'
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  ventas: Ventas[]=[];
  ventas1: Ventas[]=[];
  public factura: Factura[]=[];
  ventFechaVisible!: boolean;
  ventProvVisible!: boolean;
  ventProductoVisible!: boolean;
  ventPdfVisible!: boolean;
  ventBalncVisible: boolean = false;
  selectedFactura: any;
  public sumAnul: number=0;
  public sumPago: number=0;
  public sumImpt: number=0;
  public sumNeta: number=0;
  public sumAnulImpt: number=0;
  public sumAnulNeta: number=0;
  public pdfUrls: string[] = []; 
  public pdfUrl: string = '';
  public verPdf: boolean[] = [];
  public readonly pageViewMode: 'multiple' | 'single' = 'single';

  constructor (public myListVentasService: PedidosService) {}

  ngOnInit() {
    this.ventFechaVisible = false;
    this.ventProductoVisible = false;
    this.ventProvVisible = false;
    this.ventPdfVisible = false;
    this.ventBalncVisible = false;
    // Debes inicializar el array de visualización de PDFs aquí si lo vas a usar
    this.verPdf = new Array(this.factura.length).fill(false);
  }

  ventFecha() { 
    this.ventProductoVisible = false;
    this.ventProvVisible = false;
    this.ventPdfVisible = false;
    this.ventBalncVisible = false;
    
    this.myListVentasService.getVentaFech().subscribe(ventas => {
      this.ventas = ventas;
      this.ventFechaVisible = true;
    }); 
  }

  ventProducto() {
    this.ventProvVisible = false;
    this.ventFechaVisible = false;
    this.ventPdfVisible = false;
    this.ventBalncVisible = false;
    
    this.myListVentasService.getVentaProd().subscribe(ventas => {
      this.ventas = ventas;
      this.ventProductoVisible = true;
    }); 
  }

  ventProv() {
    this.ventProductoVisible = false;
    this.ventFechaVisible = false;
    this.ventPdfVisible = false;
    this.ventBalncVisible = false;
    
    this.myListVentasService.getVentaProv().subscribe(ventas => {
      this.ventas = ventas;
      this.ventProvVisible = true;
    }); 
  }

  ventImpt() {
    this.ventProductoVisible = false;
    this.ventProvVisible = false;
    this.ventFechaVisible = false;
    this.ventBalncVisible = false;

    this.myListVentasService.getVentaImpt().subscribe(facturas => {
      this.factura = facturas;
      console.log(this.factura)
      for (let index = 0; index < Object.keys(this.factura).length; index++) {
        this.verPdf[index] = false;
        this.pdfUrls[index] = `http://localhost:3000/${this.factura[index].pdfFactura}`;
      }
    }); 
    this.ventPdfVisible = true;
    console.log("lo que ver",this.pdfUrls,this.verPdf)
    this.ventFechaVisible = false;
  }

  venBalnc () {
    this.ventFechaVisible = false;
    this.ventProductoVisible = false;
    this.ventProvVisible = false;
    this.ventPdfVisible = false;
    this.ventBalncVisible = true;
    this.myListVentasService.getVentaFech().subscribe(ventas => {
      this.ventas = ventas;
      this.sumAnul = 0;
      this.sumAnulImpt = 0;
      this.sumPago = 0;
      this.sumImpt = 0;
      this.sumNeta = 0;
      
      for (let index = 0; index < Object.keys(this.ventas).length; index++) {
          const ventas = this.ventas[index]
          if (ventas.anulaPedido && ventas.pagoPedido) {
            this.sumAnul = this.sumAnul + ventas.Precio_Total;
            this.sumAnulImpt = (this.sumAnulImpt + ((ventas.Precio_Total * 10)/100))
          }
          if (ventas.pagoPedido && !ventas.anulaPedido) {
            this.sumPago = this.sumPago + ventas.Precio_Total;
            this.sumImpt = (this.sumImpt + ((ventas.Precio_Total * 10)/100))
          } 
      } 
      this.sumNeta = this.sumPago - this.sumImpt
      this.sumAnulNeta = 0
    }); 
  }
  
 
  pdfActivoIndex: number | null = null;

togglePDF(index: number): void {
  this.pdfActivoIndex = this.pdfActivoIndex === index ? null : index;
}

}