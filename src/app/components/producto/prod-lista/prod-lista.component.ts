import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatSort,
  Sort,
} from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { Producto } from '../../../interfaces/producto';
import {
  MensajesServiceService,
} from '../../../services/mensajes-service.service';
import { ProdServiceService } from '../../../services/prod-service.service';
import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';
import { ProdVistaComponent } from '../prod-vista/prod-vista.component';

@Component({
  standalone: true,
  selector: 'app-prod-lista',
  templateUrl: './prod-lista.component.html',
  styleUrl: './prod-lista.component.css',
  imports: [
    CommonModule,
    MatTableModule, // if you use <mat-table>
    MatPaginatorModule, // ← provides <mat-paginator> + pageSizeOption
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    SeccionDeTitulosComponent,
    MatIconModule,
    MatTooltipModule,
    RouterModule
]
})


export class ProdListaComponent {

      displayedColumns: string[] = ['Nombre', 'Descripcion', 'Precio', 'Imagen' , 'Categoria', 'Publicacion', 'Codigo', 'Promocion' ,'Acciones'];
      dataSorce  = MatTableDataSource<Producto>;
      dataSource: any;
      loading: boolean = false;
      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
  
      constructor(public dialog: MatDialog, 
                  private _productoService: ProdServiceService, 
                  private _snackBar: MatSnackBar,
                  public _sharemensaje: MensajesServiceService,
                ) 
      {
          this.dataSource = new MatTableDataSource();
      }

      ngOnInit() {
        this.obtenerProducto()
      }

      ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    
      announceSortChange($event: Sort) {
        throw new Error('Method not implemented.');
      }
        
      addEditProducto(id?: number) {
      const dialogRef = this.dialog.open(ProdVistaComponent, {
          width : "550PX",
          disableClose: true,
          data: {id: id}
        });
         
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
             this.obtenerProducto();
          }      
        });
      }

      obtenerProducto() {
        this.loading = true;
        this._productoService.getProductos().subscribe({
          next: data => { 
            this.dataSource.data = data;
          },
          error: (error) => {
            alert('There was an error in retrieving data from the server');
          },
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

      btnDelete(id: number) {
        this._productoService.deleteProductos(id).subscribe(() => {
          this.obtenerProducto();
        })
      }

      mensajeSnack() {
        this._snackBar.open("Persona Eliminada Con Exito", "", { duration: 2000 });
      }
      

}

     



