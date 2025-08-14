import {
  CommonModule,
  DecimalPipe,
} from '@angular/common';
import {
  Component,
  Inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { Cliente } from '../../../interfaces/clientes';
import { DataService02Service } from '../../../services/data-service02.service';
import {
  TarjetasComponent,
} from '../../plataformas/tarjetas/tarjetas.component';

@Component({
  selector: 'app-menu-pasarela',
   standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    DecimalPipe,
    FormsModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule, // si usas <button mat-button>
    MatTooltipModule, // si usas matTooltip
    //FlexLayoutModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    TarjetasComponent,
],

  templateUrl: './menu-pasarela.component.html',
  styleUrl: './menu-pasarela.component.css'
})
export class MenuPasarelaComponent {

 
  divPaypal    : boolean = false;
  divPayTran   : boolean = false;
  divpayCard   : boolean = false;
  divpayCash   : boolean = false;
  divRefOpen   : boolean = false;

  pay             : string = "null";
  public cliente  : Cliente[]=[];
  public productos: any[] = [];
  public datos    : any;
  


  constructor(@Inject(MAT_DIALOG_DATA) 
              private router        : Router,
              public dialogRef      : MatDialogRef<MenuPasarelaComponent>,
              public _dataSer02     : DataService02Service,
              private snackBar      : MatSnackBar,) 
              {

  }


  ngOnInit() {
    this.divRefOpen = true;
    
    this._dataSer02.data$.subscribe(datos => {
      this.datos = datos  
    }, 
    error => { 
      console.error('Error al obtener los datos:', error); 
    });
  }

  objectKeys(obj: any): string[] { 
    return Object.keys(obj); 
  }

  close(action?: string): void { 
    this.dialogRef.close(action); 
    this.router.navigate(['/productos/galeria']); 
  }

  payWithFrm(pay:any) { 
    this.pay = pay;
    this.divPaypal   = false;
    this.divPayTran  = false;
    this.divpayCard  = false;
    this.divpayCash  = false;
    if (this.pay==="Card") {
      // Lógica para procesar el pago 
      this.divRefOpen = false;
      this.divpayCard = true;
    } 
    if (this.pay==="Paypal") {
        // Lógica para procesar el pago 
        this.divRefOpen = false;
        this.divPaypal = true;
    }
    if (this.pay==="TranBank") {
      // Lógica para procesar el pago 
      this.divRefOpen = false;
      this.divPayTran = true;
    }
    if (this.pay==="Cash") {
      // Lógica para procesar el pago con 
      this.divRefOpen = false;
      this.divpayCash = true;
    }

  } 
  

  onNoClick(pay:any): void {
    console.log("ONCLICK PASARELA",pay)
    if (pay==="null") {
      this.showSnackbar("Su Pedido quedara removido del Cart", "Cerrar")
      pay = "null"
      this.dialogRef.close(pay);
    } else {

      this.showSnackbar("Ya Hizo Su Pago y Se Registrara - Anulada", "Cerrar")
      pay = "null"
      this.dialogRef.close(pay);
  }
    }
    

  onYesClick(pay:any): void {
    console.log("onYes",pay)
    if (pay==="null") {
      this.showSnackbar("Debe Seleccionar Metodo de Pago ", "Cerrar")
    }
    else { 
      this.showSnackbar("Su Compta Queda Registrada..Espere Su Factura", "Cerrar")
       this.dialogRef.close(pay);
    }
   
  }

  
   
  showSnackbar(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 4500, // Duration in milliseconds
    });
    }

}
