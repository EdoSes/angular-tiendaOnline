import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { tarjetas } from '../../../interfaces/tarjetas';
import { TarjetaService } from '../../../services/tarjeta.service';

'../../plataformas/tarjetas/tarjetas.component';

@Component({
  selector: 'app-tarjetas',
    standalone: true,
  imports: [
    CommonModule,
    MatListModule,         // <— aquí
    MatIconModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css'
})
export class TarjetasComponent {

  listCards:tarjetas [] = [];
  formCard: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  constructor(private fb              : FormBuilder, 
              private tarjetaService  : TarjetaService,
             // private toastr          : ToastrService
              ) 
  {

  }
        

  ngOnInit(): void {
    this.list();
    this.formCard =  new FormGroup({
      id_card: new FormControl(''),
      name: new FormControl(''),
      number: new FormControl(''),
      type: new FormControl(''),
      cvv: new FormControl(''),
      status: new FormControl('1')
    });
  }

  list(){
    this.tarjetaService.getCards().subscribe(resp=>{
      console.log(resp)
      if(resp){
        this.listCards = resp;
      }
    });
  }

  save(){
    this.formCard.controls['status'].setValue('1');
    this.tarjetaService.saveCard(this.formCard.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formCard.reset();
      }
    });
  }

  update(){
    this.tarjetaService.updateCard(this.formCard.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formCard.reset();
      }
    });
  }

  delete(id: any){
    this.tarjetaService.deleteCard(id).subscribe(resp=>{
      if(resp){
        this.list();
      }
    });
  }

  newCard(){
    this.isUpdate = false;
    this.formCard.reset();
  }

  selectItem(item: any){
    this.isUpdate = true;
    this.formCard.controls['id_card'].setValue(item.id_card);
    this.formCard.controls['name'].setValue(item.name);
    this.formCard.controls['number'].setValue(item.number);
    this.formCard.controls['type'].setValue(item.type);
    this.formCard.controls['cvv'].setValue(item.cvv);
  }



}
