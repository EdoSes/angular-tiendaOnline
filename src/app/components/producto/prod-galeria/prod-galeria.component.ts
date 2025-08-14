import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { Producto } from '../../../interfaces/producto';
import { cartService } from '../../../services/cart-service';
import { DataServiceService } from '../../../services/data-service.service';
import { DataService02Service } from '../../../services/data-service02.service';
import { ProdServiceService } from '../../../services/prod-service.service';
import { SeasonServiceService } from '../../../services/season-service.service';
import { VisibilidadService } from '../../../services/visibilidad-service';
import { DialogComponent } from '../../dialog/dialog.component';
import { LoginComponent } from '../../login/login.component';
import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';
import { StepperComponent } from '../../stepper/stepper.component';
import { ProdMenuComponent } from '../prod-menu/prod-menu.component';

@Component({
  selector: 'app-prod-galeria',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule, // ← Y añádelo en imports
    MatToolbarModule, // provides <mat-toolbar>
    MatListModule, // provides <mat-nav-list> & <mat-list-item>
    LoginComponent, // registers <app-login>
    MatPaginatorModule,
    MatIconModule,
    MatPaginatorModule,
    ProdMenuComponent,
    StepperComponent,
    MatTooltipModule,
    MatButtonModule,
    SeccionDeTitulosComponent
   

  
],
  templateUrl: './prod-galeria.component.html',
  styleUrl: './prod-galeria.component.css',
  animations: [ 
    trigger('seasonChange', [ 
      state('Primavera', style({ backgroundColor: 'lightgreen' })), 
      state('Verano', style({ backgroundColor: 'lightyellow' })), 
      state('Otoño', style({ backgroundColor: 'lightorange' })), 
      state('Invierno', style({ backgroundColor: 'lightblue' })), 
      transition('* <=> *', animate('1s ease-in-out')) 
    ]) 
  ]
})


export class ProdGaleriaComponent implements OnInit {

  cardVisible         : boolean = true;
  pageVisible         : boolean = true;
  divLocVisible       : boolean = false;
  divToolbarCont      : boolean = false;
  public visible      : boolean = false;
  public badgeContent : number  = 0;
  private recentlyApplied = new Set<number>();

  
  //Cargar Productos en los Card 
  public productos     : Producto[]=[];

  // cargar Productos en el Cart
  public listProductos      : Producto[]=[];
  public productosFiltrados : Producto[]=[];
  badgevisible              : boolean = true;
  public valorPed           : number  = 0;
  public count              : boolean = true;
  strLogin                  : string = "";
 
// variables de paginacion
  public currentData    :any;
  public pageSlice      :any;
  opcionMnu             :any;

  currentSeason         :string="";
  length = 100;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];


 

  constructor(public _productoService : ProdServiceService, 
              public  myCartServ      : cartService,
              public _dataSerCount    : DataServiceService,
              private menuopc$Service : DataService02Service,
              private router          : Router,
              private snackBar        : MatSnackBar,
              public  dialog          : MatDialog,
              private visible_srv     : VisibilidadService,
              private seasonService   : SeasonServiceService,
              private cdRef: ChangeDetectorRef
              ) 
  {
      this.currentData=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    
  }
             
  ngOnInit() {
    this.badgeContent = 0;
    this._dataSerCount._dataCountCart = 0;
    this.strLogin = "";
    this.currentSeason = this.seasonService.getCurrentSeason();
    //console.log(this.currentSeason)
    this.visible_srv.ocultarComponente()
    this._productoService.getProductos().subscribe(data => { 
      this.productos = data; 
      this.productosFiltrados = data
    }); 
    this.visible_srv.visible$.subscribe(visible => { 
      this.visible = visible; 
    });
    this.menuopc$Service.dataOpcion$.subscribe(data => { 
      this.opcionMnu = data; 
      this.filtrarProductos(); 
       this.cdRef.detectChanges();
    });
    
    this._productoService.getProductos().subscribe(data => { 
      this.productos = data; 
      this.filtrarProductos(); 
       this.cdRef.detectChanges();
    }); 
  } 
  
  filtrarProductos() { 
    if (this.opcionMnu && this.productos) { 
      this.productosFiltrados = this.productos.filter(producto => producto.categoriaProducto === this.opcionMnu && producto.publicacionProducto ); 
      console.log("filtrados",this.productosFiltrados)
    } 
  }

  ofertProd() {
    this.productosFiltrados = this.productos.filter(producto => producto.promocionProducto > 0 );
    console.log( this.productosFiltrados)
  }
    
  addCart(producto: Producto) {
    console.log("addCartProducto",producto)
    this.myCartServ.addServProd(producto);
    // Incrementa en badge
    this._dataSerCount.addShareData(this.badgeContent) 
    console.log("addCART", this._dataSerCount)
 
  }
 
  decremento(producto: Producto, indice: number) {
    //console.log("decProducto",producto)
    if (producto.cantidadProducto === 0) {
      this.count = false
    }
    if (this.valorPed  > 0 && this._dataSerCount._dataCountCart > 0 && (this.count)) {
        this.myCartServ.subServProd(producto)
        this._dataSerCount.minShareData(producto.cantidadProducto)
    }
    if (this._dataSerCount._dataCountCart > 0) {
      this.count = true
    }
  }

  incremento(producto: Producto) {
    this.myCartServ.addServProd(producto); 
    this._dataSerCount.addShareData(this.badgeContent)
    this._dataSerCount.data$.subscribe(data => { 
      this.valorPed = data; 
    });
  }

  badgevisibility() { 
    this.badgevisible = false;
  }

  get dataService() {
    return this._dataSerCount.dataService
  }

  checkOut() {
    if (this._dataSerCount._dataCountCart > 0) {
      this.router.navigate(['/pedidos/vista']);
    }
    else {
      this.showSnackbar("No Hay Items Elegidos", "Cerrar") 
      return
    }
   
  }
  
  LogAdmDiv() {
    //this.cardVisible = false;
    //this.pageVisible = false;
    //this.logAdmVisible = true;
    this.strLogin = "Admin"
    this._dataSerCount.setData("Admin")
    this.visible_srv.mostrarComponente()

  }

  openDialogContacto(title: string, message: string, buttonText: string)  {
    // this.divToolbarCont = true
    message     = 
    `
    Numero Contacto Telefonico: 300 300 300.

    Direccion de Ubicacion: Punta del Este (Urguay). 

    Correo Electronico: elearnig@gmail.com.`;
    title       = "Informacion"
    buttonText  = "Cerrar"


    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        buttonText: buttonText
      }
    });


    
  }
  
  onPageChange(event: PageEvent) {
    console.log(event);
    
    const startIndex=event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex>this.currentData.length) {
      endIndex = this.currentData.length;
    }
    this.pageSlice =this.currentData.slice(startIndex,endIndex)
  }

  showSnackbar(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000, // Duration in milliseconds
    });
  }

  openDialog(title: string, message: string, buttonText: string) {
    message     = 
    `
    1. Seleccione el Producto y Cantidades.  
    2. Verifique Informacion de su Compra. 
    3. De Click en Icono $, haga su Registro. 
    4. Provea Informacion y haga el Pago .
    5. El Sistema le enviara la Factura.`;
    title       = "Informacion"
    buttonText  = "Cerrar"


    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        buttonText: buttonText
      }
    });
  }

  localizar() {
    alert("aqui estoy")
    this.divLocVisible = true;

  }

applyPromo(producto: any) {
  // tu lógica para aplicar la promo
  console.log('Promoción aplicada a:', producto);
}


  justApplied(id: number): boolean {
    return this.recentlyApplied.has(id);
  }

  private triggerPulse(id: number) {
    this.recentlyApplied.add(id);
    setTimeout(() => this.recentlyApplied.delete(id), 1000);
  }

 

}




