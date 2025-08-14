import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { DataServiceService } from '../../../services/data-service.service';
import { DataService02Service } from '../../../services/data-service02.service';
import { PaypalComponent } from '../../plataformas/paypal/paypal.component';
import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, // provides <mat-dialog-content> & <mat-dialog-actions>
    MatSidenavModule, // provides <mat-drawer-container> & <mat-drawer-content>
    PaypalComponent,
    SeccionDeTitulosComponent
],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{


  
  public datos          : any;
  public result         : any;
  public datas02        : any;
  public a              : string[]=[];
  public divinfoPaypal  : boolean = false;
  public template       : string = "";
 
  

  constructor(private dataService       : DataServiceService,
              private dialog            : MatDialog,
              public _dataSer02         : DataService02Service,
              private router            : Router,
              public _dataSerCount      : DataServiceService,
  ) {}
 
  ngOnInit(): void {
    this._dataSer02.data$.subscribe(datos => {
      this.datos = datos;
      //console.log("cliente",datos)
    }, 
    error => { 
      console.error('Error al obtener los datos:', error); 
    });
   this.abrirDialog()
    setTimeout(() => {
      this._dataSerCount._dataCountCart = 0
      this.logout()
    }, 9000);
  }

  abrirDialog() {
    this._dataSer02.data03$.subscribe(result => {
      this.result = result
      if (this.result==="Paypal") { 
        this.divinfoPaypal = true;
      } 
    })
  
  }

  logout() {
    console.log("me despido")
    // Clear user authentication token and other local storage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.router.navigate(["/productos/galeria"]); 
  }


  

}
