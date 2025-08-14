import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
} from 'rxjs';

import { Cliente } from '../../../interfaces/clientes';
import { Pedido } from '../../../interfaces/pedido';
import { Producto } from '../../../interfaces/producto';
import { Users } from '../../../interfaces/users';
import { cartService } from '../../../services/cart-service';
import {
  ClienteServiceService,
} from '../../../services/cliente-service.service';
import { DataServiceService } from '../../../services/data-service.service';
import { DataService02Service } from '../../../services/data-service02.service';
import { PedidosService } from '../../../services/pedidos.service';
import { UsersService } from '../../../services/users.service';
import { DialogComponent } from '../../dialog/dialog.component';
import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';
import {
  MenuPasarelaComponent,
} from '../menu-pasarela/menu-pasarela.component';

@Component({
  selector: 'app-ped-vista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // activa ngForm y #f="ngForm"  
    ReactiveFormsModule, // activa [formGroup]  
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    SeccionDeTitulosComponent
],

  templateUrl: './ped-vista.component.html',
  styleUrl: './ped-vista.component.css'
})

export class PedVistaComponent implements OnInit  {

  public  color            :string  = '';
  public disabled         :boolean = false;
  public checked          :boolean = false;
  public divinfoClte      :boolean = false
  public divCrearClte     :boolean = false;
  public divupdinfoClte   :boolean = false; 
  public creaClteBtn      :boolean = false;
  public updcliteBtn      :boolean = false;
  public pagarPayBtn      :boolean = false;
  public divLogOut        :boolean = false;
 
  
  public isSubmitting     : boolean = false;
  public productos        : Producto[]=[]; 
  public _product         : BehaviorSubject<Producto[]>
 
  max                   : number = 99999999;
  public ramidCltPed    : number = 0;
  public suma           : number = 0;
  public valorPedido    : number = 0; //Valor enviado Paypal
  public valorItem      : number = 0;

  public fGroupCliente  : FormGroup;
 
  badgevisible          : boolean= true;
  stepper               : any;

  public cliente        : Cliente[]=[];
  public dataCliente    : Cliente[]=[];
  public pedido         : Pedido[]=[];
  public listcliente    : any;
  public listuser       : any;
  public dataUser       : Users[]=[];
  public data           : Cliente[]=[];
  public idPedido       : any;
  public dialogRef      : any;
 

  // valriables login 

  email                 : string= "";
  emailFind             : string= "vacio";

  constructor(public  myListProd    : cartService,   
              private fbCliente     : FormBuilder, 
              private _pedido       : PedidosService,
              private myPedidoSer   : PedidosService,
              public  myListpedidoCliente : PedidosService, 
              private _cliente      : ClienteServiceService,
              private router        : Router,
              public _dataSerCount  : DataServiceService,
              public _dataSer02     : DataService02Service,
              public _dataSer03     : DataService02Service,
              public  userService   : UsersService,
              private fblogin       : FormBuilder,
              private snackBar      : MatSnackBar,
              public  dialog        : MatDialog,
              private opcEmail_srv  : DataService02Service,
              //private visible_srv  : VisibilidadService
             )            
  {
    this._product =  new BehaviorSubject<Producto[]>([]);
    this.fGroupCliente = this.fbCliente.group({ 
      idCliente         :  ['', Validators.required],
      nombreCliente     :  ['', Validators.required],
      apellidoCliente   :  ['', Validators.required],
      emailCliente      :  ['', Validators.required],
      numeroCliente     :  ['', Validators.required],
      direccionCliente  :  ['', Validators.required]
    }); 
    
   
                         
  }

  ngOnInit() :void {  
    this._dataSer02.dataOpcionEmail$.subscribe(email => { 
      this.emailFind = email; 
      //console.log("El email en vista",email)
    });
    if (this.emailFind) {
      this.validaciones()
      this.obtenerProducto()
      this.ramidCltPed = 0;
      this.ramidCltPed = Math.floor(Math.random() * this.max);
    } 
  }


  obtenerProducto() {
    this.myListProd._product.subscribe(producto => {
      this.productos   = producto;
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
        this.valorPedido  = this.valorPedido +  this.valorItem
      }
    });
  }

 
  
  async validaciones() {
    //this.emailFind =  this.formLog.value.email
    //console.log("vista Validaciones",this.emailFind)

    //*** Get Usuario con email Usuario */

    if ((this._dataSerCount._dataCountCart == 0)) {
      this.showSnackbar("No ha Seleccionado Productos en el Cart...", "Cerrar")
      this.router.navigate(['/productos/galeria']);
    }
    //*** Get Usuario con email del Login */
    try 
      {
      const dataUser = await  firstValueFrom(this._cliente.getVerifyUser(this.emailFind))
         this.listuser = dataUser || [];
         if( (dataUser) && (Object.keys(this.listuser).length != 0)){
          this.fGroupCliente.patchValue({
            idCliente         :this.listuser[0].id,
            emailCliente      :this.listuser[0].email,
         });
        }
    } catch (error) {
        console.error('Error al cargar los datos', error);
    } 
    //*** FIN Get usuario */ 

     //*** Get Cliente con email Usuario */
    try {
      const dataClte = await lastValueFrom(this._cliente.getVerifyCliente(this.emailFind));
      this.listcliente = dataClte || [];
      if( (dataClte) && (Object.keys(this.listcliente).length != 0)){
        this.fGroupCliente.patchValue({
          idCliente         :this.listcliente[0].idCliente,
          emailCliente      :this.listcliente[0].emailCliente,
          nombreCliente     :this.listcliente[0].nombreCliente,  
          apellidoCliente   :this.listcliente[0].apellidoCliente,
          numeroCliente     :this.listcliente[0].numeroCliente, 
          direccionCliente  :this.listcliente[0].direccionCliente,
       });
      }
    } catch (error) {
      console.error('Error al cargar los datos', error);
    } 
     //*** FIN Get Cliente con email Usuario */ 
    
    const objUser = Object.keys(this.listuser).length
    const objCtle = Object.keys(this.listcliente).length
    
    //** Variables sw HTML, Desplega div y el sub div del cliente *
    this.divinfoClte    = true;  

    if ( objCtle != 0) {
        //*** Actualizar Cliente habilita boton html con updCliente Para actualizar Cliente  */
        this.divupdinfoClte =  true;
        this.updcliteBtn    = true;

        this.divCrearClte   = false;
        // console.log(" Actualizar Cliente")
       
    } 
    if ( objCtle === 0) {  
        //** Crear Cliente y habilita boton html con beginCliente Para cear Cliente  */
        this.divCrearClte  = true;
        this.creaClteBtn   = true;

        this.updcliteBtn   = false;
        //console.log("Crear Cliente")
    }
    //this.divinfoClte   = true;
    //console.log("fin Validaciones va HTML-Btn Confirmar Pedido y luego a UpdtateCliente()")
  }

 
  UpdCliente() {
    // alert("Entro por UpdCliente") cuando se confirma el  boton de hacer Pedido
    // Actualiza el cliente   // UPDATE
    //console.log("Viene de Validaciones con HTML-Btn")
     if (this.fGroupCliente.valid  && (this._dataSerCount._dataCountCart != 0)){
       this.email = this.fGroupCliente.value.emailCliente
       this._cliente.updClienteid(this.fGroupCliente)
       this.updcliteBtn   = false;
       //console.log("Sale de UpdCliente() y va addPedido")
       this.addPedido()
     }
     else {
      this.showSnackbar("Datos Invalidos Cliente o No Selecciono Items","Cerrar")
       this.router.navigate(["/productos/galeria"]);
     }
  }


  addCliente() {
    //**  Inserta un Nuevo Cliente POST    */
    //**  Envia a addPedido() para crear el pedido
    this.creaClteBtn = false;
    this.isSubmitting = true;
    if (this.fGroupCliente.valid && (this._dataSerCount._dataCountCart != 0) ){
      this._cliente.addClientes(this.fGroupCliente).subscribe(data=> {
        this.cliente =  data;
      });
      //console.log("sale para addPedido()")
      this.addPedido()
    }
    else {
      this.showSnackbar("Datos Invalidos Cliente o No Selecciono Items","Cerrar")
      this.router.navigate(["/productos/galeria"]);
    }
    this.isSubmitting = false;
  }

  addPedido() {
    //******** Verifica info del Cliente getVerifyCliente(email) y trae su informacion****/
    //console.log("LLega a addPedido")
    if (this.fGroupCliente.valid) {
      const formValues = this.fGroupCliente.value;

      // Asignar a variables de trabajo Cliente
      const idCliente  = formValues.idCliente;
      const email      = formValues.emailCliente;
      const nombre     = formValues.nombreCliente;
      const apellido   = formValues.apellidoCliente;
      const idPedido   = this.ramidCltPed;
      const valorPedido= this.valorPedido

      // Configurar Objetos objPedido Para Api
      let objPedido          = this.productos.map(a => (
        { 
        idProducto        : a.id, 
        precioProducto    : a.precioProducto-((a.precioProducto*a.promocionProducto)/100), 
        cantidadProducto  : a.cantidadProducto,
        nombreProducto    : a.nombreProducto,
        promocionProducto : a.promocionProducto
        }
      ));

       // Configurar Objeto objCliente para Api
      const objCliente = {idCliente, idPedido}

      // Configurar Objeto objClienteDialog Para Dialog
      const ObjClteDialog = { 
          idCliente,
          idPedido,
          email,
          nombre,
          apellido,
          valorPedido,
          objPedido
      }
  
      /** Crea Ventana de Referencia y Envia ObjDialogo */
      const dialogRef = this.dialog.open(MenuPasarelaComponent, {
        width  : "1100px",
        height : "600px",
      });

      /** Abre Ventana de Referencia y Envia ObjDialogo */
      dialogRef.afterOpened().subscribe(() => {
        this._dataSer02.setDataS02(ObjClteDialog)
      });

       /** Cierra  Ventana de Referencia y recibe Rta para Actualizar pedidos  */
      dialogRef.afterClosed().subscribe((result: string) => { 
        if (result!="null") { 
         
          
          /*** Dialogo Menu Pasarela determina si Adiciona el pedido a la Tabla de Pedidos y Actualiza */   
          const estadoPedido = result
          const pagoPedido   = 1
           /*** Configurar Objeto objCliente y variables Pedidos para Api y  */
          const objCliente = {idCliente, idPedido, estadoPedido, valorPedido}
          const objPedido1 = {objPedido, estadoPedido, pagoPedido}
          const ObjetoFact = {idPedido, valorPedido};
          /*** Servicios de Actualizaciones de Pedidos, Clientes, Facturas */
          this._pedido.addPedidos(objPedido1)
          this._pedido.updPedidos(objCliente)
          this.myPedidoSer.PostPedFactura(ObjetoFact)

          // falta revizar this.myPedidoSer.PedEstadosw(ObjetoPed)
          
          if (result==="Paypal") { 
            /**
             * Asigna la variable result con "PAYPAL"
             */
            this._dataSer02.setDataS03(result) 
          }
          this.router.navigate(["/pedidos/confirm"]); 
        } 
        if (result==="null") { 
           // Lógica para otras acciones o cancelaciones Remover la Compra
           this.divinfoClte = true;
           this.updcliteBtn = true;
           this.creaClteBtn = true;
           this.showSnackbar("Su pedido ..NO.. queda Registrado como PAGO.. ", "cerrar")
           //this.router.navigate(["/productos/galeria"]);
        } 
      });
    }
  }


  delProdCart(indice: number) {
    this.myListProd.delProductos(indice);
    let cantProd = this.productos.map(a=> ({cantidadProducto:a.cantidadProducto}))
    this.suma = 0;
    for(let i=0; i<cantProd.length; i++){
       this.suma = this.suma + cantProd[i].cantidadProducto
    }
    this._dataSerCount._dataCountCart =  this.suma
  }

  delAllProdCart () {
    //this._dataSerCount._dataCountCart = 0;
    this.myListProd.delAllProductos ()
   // this.openConfirmDialog('confirm')
  }

  slideToggleChange(event: MatSlideToggleChange) {
    this.color = 'primary'
    this.checked = event.source.checked;   
    if (this.checked) {
     // console.log("toggle Si",this.checked)
    } else {
     // console.log("toggle no",this.checked)
    } 
  }

  badgevisibility() {
    this.badgevisible = false;
  }

  get dataService() {
    return this._dataSerCount.dataService
  }

  cancPedido() {
    this.myListProd.delAllProductos ()
    //this._dataSerCount._dataCountCart = 0
    this.router.navigate(["/productos/galeria"]);
  }


  showSnackbar(content:any, action:any) {
  this.snackBar.open(content, action, {
    duration: 3500, // Duration in milliseconds
  });
  }

  openDialog(title: string, message: string, buttonText: string) {

    message     = `
    1. Diligencie la Forma, es Obligatoria.  
    2. El Sistema habilitara los Botones. 
    3. Registrarse: Crea un Nuevo Cliente . 
    4. Login: Si ya es Usuario del Sistema.
    5. Restablecer Contraseña: Genera una Nueva.`;

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

  abrirDialog(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
        width: '250px' 
      }
    );

    dialogRef.afterClosed().subscribe(result => {
        console.log('dialog cerrado');
    });

  }
}



  




 //LOGICA DE INTEGRACION CON LA PASARELA DE PAYPAL
//0. La Pasarela de Pago debe ENTRAR cuando da check al BOTON DE CONFIRMA PEDIDO.
    //0. El BOTON DE CONFIRMA PEDIDO, envia a checkOut() o heckUpd(), dependiendo de la tarea
    //0. Sea Validar Cliente o Crear Cliente, 
    //1. checkOut(): Registro del Cliente NUEVO .. Lo manda a Pasarale()// Pasarela()
    //2. checkUpd(): Actualizacion del Cliente  .. Lo manda a Pasarale()//Pasarela():
    //2.1 Pasarela(): Manda a Submit()
    //3. submit():  PASO FINAL Registro del Pedido en la Base de Datos y navega a la Galeria.