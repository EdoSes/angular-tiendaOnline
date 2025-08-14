import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Producto } from '../../../interfaces/producto';
import {
  MensajesServiceService,
} from '../../../services/mensajes-service.service';
import { ProdServiceService } from '../../../services/prod-service.service';

@Component({
  selector: 'app-prod-vista',
   standalone: true,
   imports: [
    CommonModule,
     MatProgressSpinnerModule, 
    FormsModule,
    MatSelectModule,     // provides <mat-select>, <mat-option> & [value]
    MatDialogModule,     // provides <mat-dialog-actions>, <mat-dialog-content>
    MatButtonModule,     // provides mat-button for dialog actions
    ReactiveFormsModule,
    MatSlideToggleModule,   // <-- aquí
    MatFormFieldModule,     // para <mat-form-field>
    MatInputModule          // para <input matInput>
  ],
  templateUrl: './prod-vista.component.html',
  styleUrl: './prod-vista.component.css'
})

export class ProdVistaComponent {

  form      : FormGroup;
  loading   : boolean     = false;
  operacion : string      = "Agregar ";
  id        : number | undefined;
  categorias: string[] = ['Flores', 'Alimentos', 'Antiguedades'];
  promociones : number[] = [0, 10, 15, 20, 25, 30, 35];

  public mensaje   : string = ""
  public checked    : boolean  = false;
 
  constructor (public dialogRef: MatDialogRef<ProdVistaComponent>, 
              private fb: FormBuilder, 
              private _productoService: ProdServiceService, 
              private _snackBar: MatSnackBar,
              private _sharemensaje: MensajesServiceService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
        
    this.form = this.fb.group({
      nombreProducto       :  ['',   [Validators.required, Validators.maxLength(20)]], 
      descripcionProducto  :  ["",   Validators.required], 
      precioProducto       :  [null, [Validators.required,
                                      Validators.pattern("^[0-9]*$"),
                                      Validators.maxLength(6)]],
      publicacionProducto  :  [true,  Validators.required], 
      codbarrasProducto    :  ["",    Validators.required],
      categoriaProducto    :  ["",     Validators.required],
      promocionProducto    :  ["",     Validators.required]
     
    });
    this.id = data.id;
  }


  ngOnInit() {
  this.esEditar(this.id)
  }

  esEditar(id :number | undefined) {
    if (id !== undefined) {
      this.operacion = "Editar "
      this.getProducto(id)
    }
  }

  getProducto (id: number) {
    this._productoService.getProducto(id).subscribe(data => {
      this.form.setValue({
        nombreProducto:       data.nombreProducto,
        descripcionProducto:  data.descripcionProducto,
        precioProducto:       data.precioProducto,
        publicacionProducto:  data.publicacionProducto,
        categoriaProducto:    data.categoriaProducto,
        codbarrasProducto:    data.codbarrasProducto,
        promocionProducto:    data.promocionProducto,
      })
    })
  }

  BtnCancelar() {
    this.dialogRef.close(false);
  }

  EditProduct() {
    if (this.form.invalid) {
     return;
   }
 
    const valProducto = this.form.value.producto;
    const producto :Producto = {
      nombreProducto:       this.form.value.nombreProducto,
      descripcionProducto:  this.form.value.descripcionProducto,
      precioProducto:       this.form.value.precioProducto,
      publicacionProducto:  this.form.value.publicacionProducto,
      codbarrasProducto:    this.form.value.codbarrasProducto,
      pathProducto:         this.form.value.pathProducto,
      cantidadProducto:     this.form.value.cantidadProducto,
      categoriaProducto:    this.form.value.categoriaProducto,
      promocionProducto:    this.form.value.promocionProducto,
      subtotalProducto:     this.form.value.subtotalProduct,
      totalProducto:        this.form.value.totalProduct
    }
    if (this.id == undefined) {
      this.mensajeSnack("Id No Existe en La BD");
    } else {
      // Actualizar Productos
      this._productoService.updateProducto(this.id, producto).subscribe(() =>{
        this.loading    = false;
        this.mensajeSnack("ACTUALIZADA");
        this.dialogRef.close(true);
      })
    }
  }

  mensajeSnack(operacion: string) {
    this._snackBar.open("Persona fue " + operacion + " Con Exito", "", { duration: 2000 });
  }
  
  slideToggleChange(event: MatSlideToggleChange) {
    this.checked = event.source.checked;  
    if (this.checked) {
      this.form.value.publicacionProducto =  this.checked
    } else {
      this.form.value.publicacionProducto =  this.checked
    }

  }


}
