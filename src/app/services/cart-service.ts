import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Producto } from '../interfaces/producto';

@Injectable({
    providedIn: "root"
})
export class cartService {

    cantProd : number = 0;
   
    // cargar Productos en el Cart
    private  myList: Producto[]=[];

    //  Variable observable cargar Productos en el Cart
    public _product    : BehaviorSubject<Producto[]>
   
    constructor() {
        this._product =  new BehaviorSubject<Producto[]>([]);
    }

    get products() {
        return this._product.asObservable();
    }

    addServProd(producto: Producto) {
        if (this.myList.length  == 0) {
            producto.cantidadProducto = 0
            this.myList.push(producto);
            this._product.next(this.myList)
        } 
        if (this.myList.length >  0) {
           const newLista = this.myList.find((elemento) =>{
                 return elemento.id == producto.id
           })
           if(newLista) {
                newLista.cantidadProducto = newLista.cantidadProducto + 1
                this._product.next(this.myList)
            }
            else {
                producto.cantidadProducto = 1
                this.myList.push(producto);
                this._product.next(this.myList)
            }
        }    
    }


    subServProd(producto: Producto) {
        if (this.myList.length  == 0) {
            producto.cantidadProducto = 0
            this.myList.push(producto);
            this._product.next(this.myList)
        } 
        if (this.myList.length >  0) {
           const newLista = this.myList.find((elemento) =>{
                 return elemento.id == producto.id
           })
           if(newLista) {
                newLista.cantidadProducto = newLista.cantidadProducto - 1
                this._product.next(this.myList)
            }
            else {
                producto.cantidadProducto = 1
                this.myList.push(producto);
                this._product.next(this.myList)
            }
        }    
    }

    
    delProductos (index: number) {
        this.myList.splice(index, 1);
        this._product.next(this.myList);
    }
    

    delAllProductos () {
        for (let index = 0; index < this.myList.length; index++) {
            this.myList.splice(0);
        }
        this._product.next(this.myList);
    }

    countProdCart() {
        for (let index = 0; index < this.myList.length; index++) {
            this.cantProd = this.cantProd + 1;
        }
    }

   

}
