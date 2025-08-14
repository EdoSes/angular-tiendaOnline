import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  Router,
  RouterModule,
} from '@angular/router';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

import { Cliente } from '../../../interfaces/clientes';
import { pedidoCliente } from '../../../interfaces/pedidoCliente';
import {
  ClienteServiceService,
} from '../../../services/cliente-service.service';
import { EmailservicesService } from '../../../services/emailservices.service';
import { facturaFacService } from '../../../services/facturaFac.service';
import { PedidosService } from '../../../services/pedidos.service';
import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';

@Component({
  selector: 'app-pedido-cliente',
   standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatTableModule, // ← gives you matHeaderCellDef, matCellDef, etc.
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, // <- para <mat-icon>
    MatTooltipModule, // <- para matTooltip
    MatToolbarModule, // <- para <mat-toolbar>
    MatProgressBarModule, // <- para <mat-progress-bar
    SeccionDeTitulosComponent,
    RouterModule
],
  templateUrl: './pedido-cliente.component.html',
  styleUrl: './pedido-cliente.component.css'
})


export class PedidoClienteComponent {
 
  verCliente              : boolean = false;
  verFactura              : boolean = false;
  verClienteDetalle       : boolean = false;
  VerinfoCliente          : boolean = false;
  verDivCorreo            : boolean = false;
  postFactura             : boolean = false;
  infoVisible             : boolean = false;
  

  public      numPedido  : any ;
  public      numCliente : string = "";
  public      idCliente  : any;
  public      idPedido01 : any;
  public      fechaPedido: any;
  public      valortotal : number=0;
  public      CanItem    : number=0;
  public      infoApelld : string = "";
  public      infoNombre : string = "";
  public      infoNumero : string = "";
  public      infoDirecc : string = "";
  public      infoemail  : string = "";
  
  numPedSearch            : number = 0;
  numCliSearch            : number = 0;
  clientes                : Cliente[]=[];
  cliente                 : Cliente[]=[];
  infocliente             : pedidoCliente[]=[];
  pedcliente              : pedidoCliente[]=[];
  pedcliente01            : pedidoCliente[]=[];
  pedcliente03            : pedidoCliente[]=[];
  
  dataSource              : any;
  dataSource01            : any;
  form                    : FormGroup | any;
  emailForm               : FormGroup
  validator               : Boolean= true;
  submitted               : Boolean= true;
  drawer                  : any;
  selectedFile!           : File;
  checked                 : number = 9;
  
  ordersData = [
    {name: 'Pago',       selected: false, disabled: false},
    {name: 'Enviado',    selected: false, disabled: false},
    {name: 'Anulado',    selected: false, disabled: false }
  ];

  displayedColumns: string[] = ['IdCliente', 'Nombre', 'Apellido', 'Numero', 'Email', 'Direccion', 'Pedidos', 'Acciones']

  public _pedidoCliente!  : BehaviorSubject<pedidoCliente[]>;
  dataSorce  = MatTableDataSource<Cliente>;
  

  // Variables Post Facturas

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;
  nombreProducto: any;

  constructor(public  myListCliente       : ClienteServiceService,
              public  myListpedidoCliente : PedidosService,
              public  estadoPedidoSer     : PedidosService,
              public  facturaFacSer       : facturaFacService,
              private formBuilder         : FormBuilder,
              private router              : Router,
              private dialog              : MatDialog,
              private http                : HttpClient,
              private fb                  : FormBuilder,
              private _emailService       : EmailservicesService,
              private snackBar            : MatSnackBar)  
  {
    this.emailForm = this.fb.group({
       to     : ['', [Validators.required, Validators.email]], 
       subject: ['', Validators.required], 
       message: ['', Validators.required],
    });
    this.dataSource = new MatTableDataSource();
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
    // synchronous orders
    this.ordersData = this.getOrders();
    this.addCheckboxes();
    
  }

  ngOnInit() {
    this.postFactura        = false;
    this.verFactura         = false;
    this.verClienteDetalle  = false;
    this.verDivCorreo       = false
    this.verCliente         = true;
    this.obtenerCliente()
  }
 
  obtenerCliente() {
    //get de clientes
    this.myListCliente.getCliente().subscribe(cliente => {
     this.clientes        = cliente;
     this.dataSource.data = cliente;
     //console.log(this.dataSource.data )
    });
  }

  getpedidoCliente(id: number) {
    //get de pedidos por cliente
    this.verCliente = true;
    this.myListpedidoCliente.getpedClienteServ(id).subscribe(pedcliente => {
      this.pedcliente = pedcliente
      this.pedcliente.map(pedcliente => ({ 
        ...pedcliente, 
            pagoPedido    : pedcliente.pagoPedido     || { pago     : false}, 
            anulaPedido   : pedcliente.anulaPedido    || { anula    : false},
            tramitePedido : pedcliente.tramitePedido  || {tramitado : false}
          }
      ));
      let idpedido        = {idPedido   :this.pedcliente[0].idPedido}
      this.idPedido01     = idpedido;    
    });
  

  }

  findCustomer() {
    this.verCliente = true
    this.numCliSearch = parseInt(this.numCliente)
  }

  getidPedido(idPedido:number)  {
    //get de items de productos de un pedido particular
    this.verCliente = false;
    this.verClienteDetalle = true
    this.verFactura = false;
    this.numPedSearch = idPedido
    this.myListpedidoCliente.getPedFactura(this.numPedSearch).subscribe(pedcliente01 => {
      this.pedcliente01  = pedcliente01;
      if (this.pedcliente01.length==0) {
        alert("Este Pedido No Existe...")
        window.location.reload();
      }
      else {
        this.idPedido01  = JSON.parse(JSON.stringify(this.pedcliente01))
        this.idPedido01 = {idPedido : this.idPedido01[0].idPedido}
        //Numero de Pedido
        for (let index = 0; index < Object.keys(this.pedcliente01).length; index++) {
          const pedcliente   =  this.pedcliente01[index]        
          this.valortotal    =  this.valortotal + pedcliente.cantidadPedido*pedcliente.precioPedido;
          this.CanItem       =  this.CanItem    + pedcliente.cantidadPedido;
        }   
      }
    });
    
  }

  getinfoCliente () {
     //get de un cliente particular
    this.VerinfoCliente = true;
    this.pedcliente03   = JSON.parse(JSON.stringify(this.pedcliente01))
    let idCliente       = {idClientePedido : this.pedcliente03[0].idClientePedido}
    this.idCliente      = JSON.parse(JSON.stringify(idCliente))
    this.idCliente      = this.idCliente.idClientePedido
    this.myListCliente.getClienteid(this.idCliente).subscribe(cliente => {
      this.infocliente = cliente;
    });
   
  }

  getinfoFactura() {
    //Hacer Factura
   
    this.verCliente        = false;
    this.verClienteDetalle = false;
    this.verFactura        = true;

    //Numero de Pedido
    this.idPedido01        = Object.values(this.idPedido01) 
   
     //Fecha de Pedido
    let fechaPedido    = {fechaPedido : this.pedcliente01[0].fechaPedido}
    this.fechaPedido   = Object.values(fechaPedido) 
    
    //Informacion del Cliente para Factura
    let idCliente       = {idClientePedido : this.pedcliente01[0].idClientePedido}
    this.idCliente      = JSON.parse(JSON.stringify(idCliente))
    this.idCliente      = this.idCliente.idClientePedido
    this.myListCliente.getClienteid(this.idCliente).subscribe(cliente => {
      this.infocliente = cliente;
      this.infoApelld  = (this.infocliente[0].apellidoCliente)
      this.infoNombre  = (this.infocliente[0].nombreCliente)
      this.infoNumero  = (this.infocliente[0].numeroCliente)
      this.infoDirecc  = (this.infocliente[0].direccionCliente)
      this.infoemail   = (this.infocliente[0].emailCliente)
    });
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
    this.estadoPedidoSer.PedEstado(obj) 
 
  }


  getCheckboxValue(event:any) {
    //Check de Estados de un pedido en particular
    // stop here if form is invalid
    if(event.target.checked==true){
      const selectedOrderIds = this.form.value.orders.map((checked: any, i:number) => checked ? this.ordersData[i].name : null)
      .filter((v: null) => v !== null);
      // Ir API PUT check
     // console.log("select",selectedOrderIds)
      const returnedTarget = Object.assign({}, selectedOrderIds , this.idPedido01);
      //console.log("return",returnedTarget)
      this.estadoPedidoSer.PedEstado(returnedTarget) 
    }
    else{
       //UnCheck de Estados de un pedido en particular
       const deselectedOrderIds = this.form.value.orders.map((checked: any, i:number) => checked ? this.ordersData[i].name : null)

    }
  }
 
  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  getOrders() {
    return [
      {name: 'Pago',     selected: false, disabled: false},
      {name: 'Enviado',  selected: false, disabled: false},
      {name: 'Anulado',  selected: false, disabled: false }
    ];
  }

  sendEmail() {
    this.postFactura        = false;
    this.verFactura         = false;
    this.verClienteDetalle  = false;
    this.verDivCorreo       = true;
    this.verCliente         = false;
    this.pedcliente03   = JSON.parse(JSON.stringify(this.pedcliente01))
    let idCliente   = {idClientePedido : this.pedcliente03[0].idClientePedido}
    this.idCliente  = JSON.parse(JSON.stringify(idCliente))
    this.idCliente  = this.idCliente.idClientePedido
    this.myListCliente.getClienteid(this.idCliente).subscribe(cliente => {
      this.infocliente = cliente;
      this.emailForm.get('to')?.setValue(this.infocliente[0].emailCliente);
    })
    if (this.emailForm.valid) {
      const formdata = new FormData 
      formdata.append("to",this.emailForm.value.to)
      formdata.append("subject",this.emailForm.value.subject)
      formdata.append("message",this.emailForm.value.message)
      formdata.append("file",this.fileName)
      if (!(this.fileName.endsWith('.pdf'))) {
        this.showSnackbar("Solo Envia archivos con extencion ..pdf..", "cerrar")
      }
      //console.log(formdata.get("file"))
      //console.log(formdata.get("to"))
      //console.log(formdata.get("subject"))
      //console.log(formdata.get("message"))
      this._emailService.sendEmail(formdata).subscribe({ 
        next: (res) => { 
        console.log('Email enviado con éxito'); }, 
        error: (err) => {
          console.error('Error al enviar el email:', err); 
        } 
      }); 

      
      this.postFactura        = false;
      this.verFactura         = false;
      this.verClienteDetalle  = false;
      this.verDivCorreo       = false;
      this.verCliente         = true;
    } 
  }

  clearForm(form: FormGroup) {
    form.reset();
  }
  
  back()  {
   
  }
   
   abrirDialog(templateRef: any) {

    let dialogRef = this.dialog.open(templateRef, {
      width: '635px',  height: '94px'})


      dialogRef.afterClosed().subscribe(result => {
        console.log('dialog cerrado');
    });

   }

   // Logica Post Factura

  selectFile(event: any): void {
    this.progress = 0;
    this.message = "";

    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }
 
  
  loadPDF() { 
    // Hacer post de datos Factura, datos publicos en app en la base de datos de Facturas
    //this.valortotal
    //this.idPedido01
    //Hacer post de la factura a la basae de datos
     
    this.fileInfos = this.facturaFacSer.pdfgetFiles();
    console.log(this.fileInfos)


    const data  = {idPedido : this.idPedido01, valor:this.valortotal}
    if (this.currentFile) {
      console.log(this.currentFile)

      this.facturaFacSer.postfacturaFac(this.currentFile,data).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.facturaFacSer.pdfgetFiles();
            console.log(this.fileInfos)
          }
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }


  downloadAsPDF() { 
    // generar pdf
    const element = document.getElementById('contentToConvert');
    if (!element) {
     console.error('Element not found');
     return;
    }
    html2canvas(element).then((canvas) => {
     const imgData = canvas.toDataURL('image/png');
     const pdf = new jsPDF('l', 'pt', 'a4'); // Portrait, millimeters, A4 size
     pdf.setFont("arial", "bold");
     pdf.setFontSize(12);
     pdf.setTextColor(40);
     const width  = pdf.internal.pageSize.getWidth();
     const height = pdf.internal.pageSize.getHeight();
     pdf.addImage(imgData, 'PNG', 0, 0, width, height);
     pdf.save(`${this.idPedido01}`+'.pdf');
     this.postFactura = true;
     });
  }


  showSnackbar(content:any, action:any) {
  this.snackBar.open(content, action, {
    duration: 3500, // Duration in milliseconds
  });
  }

  showInfo() {
    this.infoVisible = true
 
  }

  hideInfo() {
    this.infoVisible = false
 
  }



}
