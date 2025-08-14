import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DataService02Service } from '../../../services/data-service02.service';

@Component({
  selector: 'app-prod-menu',
  standalone: true,
  imports: [CommonModule,   FormsModule  ],
  templateUrl: './prod-menu.component.html',
  styleUrl: './prod-menu.component.css'
})
export class ProdMenuComponent {

  readonly OPTIONS: {option: string }[] = [ 
    {option: 'Flores' }, 
    {option: 'Alimentos' }, 
    {option: 'Antiguedades' },
   ];
     
    // Set the default selected option //
    selectedOption = this.OPTIONS[0].option; // Default to "Option 2"

  constructor(private menuopc$Service : DataService02Service) {}
 
  ngOnInit() {}

  onSelectionChange(event: Event): void { 
   
    const selectedValue = (event.target as HTMLSelectElement).value; 
    this.selectedOption = String(selectedValue); 
   //console.log('Selected Option', this.selectedOption, typeof(this.selectedOption)); 
    // Handle the selected option }
    //console.log("prod-menu", this.selectedOption)
    this.menuopc$Service.setDataOpcMnu(this.selectedOption)
  }
}