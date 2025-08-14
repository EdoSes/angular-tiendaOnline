import { Component } from '@angular/core';

import { map } from 'rxjs';

import { cartService } from '../../../services/cart-service';

@Component({
  selector: 'app-prod-total',
  templateUrl: './prod-total.component.html',
  styleUrl: './prod-total.component.css'
})
export class ProdTotalComponent {

 public total : number = 0;

  constructor(private myCartotService: cartService){}

  ngOnInit() {
    this.total = 0
    this.myCartotService.products.pipe(map(products => {
      return products.reduce((prev, curr)=> prev+(curr.precioProducto*curr.cantidadProducto), 0 )
    }))
    .subscribe (val=>{
      this.total = val;
      //console.log(val)
    })
  }
}
