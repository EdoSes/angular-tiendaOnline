import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router,
  RouterModule,
} from '@angular/router';

import { Users } from '../../interfaces/users';
import { ClienteServiceService } from '../../services/cliente-service.service';
import {
  SeccionDeTitulosComponent,
} from '../shared-app/title-section/title-section';

@Component({
  selector: 'app-usuarios',
   standalone: true,
  imports: [
    CommonModule,
    MatIconModule,      // ← aquí
    SeccionDeTitulosComponent,
    RouterModule
  ],

  templateUrl: './Usuarios.component.html',
  styleUrl: './Usuarios.component.css'
})

export class UsuariosComponent implements OnInit {

  public cliente           : Users[]=[];
  public listCliente       : Users[]=[];
  public visible           : Boolean= false;




  constructor(
              private snackBar      : MatSnackBar,
              private router        : Router,
              public  myList        : ClienteServiceService           
              ) 
  { 
   

  } 
  
  ngOnInit(): void { 
    this.myList.getClienteReg().subscribe(cliente => {
      this.listCliente  = cliente;
      if (this.listCliente.length===0) {
        setTimeout(() => { 
            this.showSnackbar("No hay Usuarios para BORRAR","Cerrar")
             this.cancelar()
        }, 3500);
       
      }
      else {
        this.visible = true;
      }
    });
  }
  
  delCliente(obj:any) {
    // Eliminar el cliente del array listCliente 
    this.listCliente = this.listCliente.filter(cliente => cliente.id !== obj.id); 
    // Llamar al método del servicio para eliminar el cliente del backend 
    this.myList.delClienteReg(obj.id).subscribe( response => { 
      console.log('Cliente eliminado exitosamente:', response); 
    }, error => { console.error('Error al eliminar el cliente:', error); 
      // Opcional: Restaurar el cliente en la lista si hay un error 
      this.listCliente.push(obj); 
    }); 
  }

 
  cancelar() {
    this.visible = false;
    this.router.navigate(["/navegation/bar-Navegation"]);
  }

  showSnackbar(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 9000, // Duration in milliseconds
    });
  }
}


