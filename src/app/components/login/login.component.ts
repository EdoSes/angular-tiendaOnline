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
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { DataServiceService } from '../../services/data-service.service';
import { DataService02Service } from '../../services/data-service02.service';
import { UsersService } from '../../services/users.service';
import { VisibilidadService } from '../../services/visibilidad-service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,    // provee mat-form-field, mat-label
    MatInputModule,        // provee matInput en <input>
    MatIconModule,          // iconos de Material
    ReactiveFormsModule,    // admite formGroup
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  
  //variables Login Adm
  errorMessage      : string = ""
  secret            : string= "";
  strLogin          : string= "";
  formLog           : FormGroup;
  resetPasswordForm : FormGroup; 
  divlogVisible     : boolean = false;
  divOlvidoPass     : boolean = false;
  isLoading         : boolean = false;
  rutaActiva        : string = "";
  datos             : any;
  visible           : boolean  = true;
  token             : any;


  constructor (private fblogin     : FormBuilder,
              private fb           : FormBuilder, 
              public  userService  : UsersService,
              private router       : Router,
              public  dialog       : MatDialog,
              private snackBar     : MatSnackBar,
              private route        : ActivatedRoute,
              private visible_srv  : VisibilidadService,
              private opcEmail_srv : DataService02Service,
              public _dataSerCount : DataServiceService) 
  {
    this.formLog = fb.group({
     usuario: ['', [Validators.required]],
     email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(7)]]
    });

   this.resetPasswordForm = this.fb.group({ 
    newPassword: ['',[Validators.required,
                        Validators.pattern(/\d+/)]]
    });                  
  } 

  ngOnInit()  {
    //this.token = this.route.snapshot.paramMap.get('token');
    this.isLoading= false;  
    this.visible_srv.visible$.subscribe(visible => { 
      this.visible = visible; 
    });
  }

  login() {
    this.visible_srv.mostrarComponente()
    this._dataSerCount.data$.subscribe(str => { 
      this.strLogin = str; 
    });
    // Validamos que el usuario ingrese datos
    if (this.formLog.value.email == '' || this.formLog.value.pass == '' || this.formLog.value.usuario == '' ) {
      this.showSnackbar('Los campos de Login de Administrador son obligatorios',"Cerrar")
      this.router.navigate(['/productos/galeria']);
      this.router.navigate(['/protected']);
    }
    if (this.formLog.valid) {
      this.isLoading = true;
      this.userService.login(this.formLog.value,'my-jwt-token').subscribe({  
          next: (response) => { 
            setTimeout(() => {  
              // Aquí puedes manejar la lógica de inicio de sesión 
              this.errorMessage = response
              this.showSnackbar("Usuario Validado Exitosamente","Cerrar")
              if (this.strLogin==="Admin" && this.formLog.value.usuario === "Admin" && this.formLog.value.email === "learnigease@gmail.com"  ) {
                  // Navega a menus de Usuario - interno
                  console.log("En el NAvegation")
                  this.router.navigate(["/navegation/bar-Navegation"]);
                   this.router.navigate(["navegacion/barra"]);
                
              } 
              if (this.strLogin==="Shipping") {
                  // Navega a componente /pedido/shipping para visualizar el shipping 
                this.opcEmail_srv.dataSendEmail(this.formLog.value.email)
                this.router.navigate(['/pedidos/shipping']);
              }
              if (this.strLogin==="CheckOut" && this._dataSerCount._dataCountCart > 0) {
                // Navega a procedimiento de validaciones del Cliente para toma de Pedidos
                this.opcEmail_srv.dataSendEmail(this.formLog.value.email)
                this.router.navigate(['/pedidos/vista']); 
              }  
            }, 2500);
             
          },
          error: (err) => {
            this.isLoading = false; 
             this.errorMessage = "El Usuario NO Coincide con el REGISTRADO"
             //console.log(err)
             this.showSnackbar("Este Usuario No Existe..Registrese..","Cerrar")
          }
       });
       
     }
  }

  
  sigIn() {
    this.isLoading = false; 
    this.userService.signIn(this.formLog.value).subscribe({  
     next: (err) => {
        this.errorMessage = err
        this.showSnackbar("Usuario Creado Exitosamente","Cerrar") 
       // this.validaciones()
      
      },
      error: (err) => {
        this.errorMessage = err
        this.showSnackbar("Usuario Ya Existe...Intentelo Nuevamente","Cerrar")        
         console.log(this.errorMessage)
        // this.router.navigate(["/productos/galeria"]);
      }
    }); 
  }

  /***** Olvido de PassWord Cambia el passWord enviando LINK al Cliente -  */
  onNewPass(): void   {
    this.isLoading = false; 
    //this._dataSer03.setDataS03(this.formLog.value.email)
    const datosAdicionales = {link: this.formLog.value.email }; 
    this.datos = Object.assign({}, datosAdicionales)
    console.log(this.formLog.value.email)
    if (this.datos) {    
      this.userService.linkPassword(this.datos).subscribe({  
        next: (response) => { 
           // Handle successful logica
           this.showSnackbar("En su bandeja de Correo, de Click al LINK, restablecera su Constraseña","Cerrar")
           this.router.navigate(["/productos/galeria"]);
        }, error: (err) => {
          this.errorMessage = err
          console.log(this.errorMessage)
        }
      });   
    } else {
      this.showSnackbar("Digite Su correo Electronico y de Click a Restablecer Contraseña","Cerrar" )
    }
    
  }

  
  cancelar () {
    this.visible_srv.ocultarComponente()
    this.router.navigate(["/productos/galeria"]);
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

  
  openConfirmDialog(action: string): void {
    //**********esta rutina no se usa */
    let title, message, buttonText;
    switch (action) {
      case 'create':
        title = 'Confirmar Acción';
        message = 'Usuario NO existe, Desea Registarse...?';
        buttonText = '';
        break;
      case 'delete':
        title = 'Eliminar Cliente';
        message = '¿Estás seguro de que quieres eliminar este cliente?';
        break;
      case 'update':
        title = 'Actualizar Cliente';
        message = '¿Estás seguro de que quieres actualizar los datos del cliente?';
        break;
      default: 'confirm' 
        title = 'Confirmar Acción';
        message = '¿Estás seguro de que quieres continuar con esta acción?';
        break;
    }

    
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: { title, message, buttonText: buttonText }
    });

    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`La acción ${action} fue confirmada`);
        // Logic to handle the confirmed action
         if (action==='create') {
           this.sigIn()
         }
         if (action==='confirm') {
         // this.myListProd.delAllProductos ()
          this.router.navigate(["/productos/galeria"]);
        }
       
      } else {
        console
      }
    });
  }



  showSnackbar(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000, // Duration in milliseconds
    });
  }
}

  




  /***** Cambia el passWordo por otro - NO SE USA en esta Aplicacion
  resetPass(): void { 
    this.divOlvidoPass = true
    if ( this.resetPasswordForm.valid) {   
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      this.userService.resetPass(this.token, newPassword).subscribe({  
        next: (response) => { 
           // Handle successful logica
           this.showSnackbar(" Su Constraseña esta Reestablecida","Cerrar")
           this.router.navigate(["/productos/galeria"]);
        }, error: (err) => {
          this.errorMessage = err
          console.log(this.errorMessage)
        }
      });   
    } else {
      this.showSnackbar("Error, el Password minimo 6 caracteres","Cerrar" )
    }
    this.divOlvidoPass = false

  }
 ***/


  
 // loginSecurity() {
  // Rutina de Prueba Validacion JWT /Login - solo para prueba
  //  this.username="Ease"
   // alert("llegue")
   // // this.userService.loginProtected(this.username).subscribe(response => { 
   //   this.userService.setToken(response.token); 
   //   this.router.navigate(['/protected']); 
   // });
 // }