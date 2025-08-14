import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasonServiceService {

  constructor() { }

  getCurrentSeason(): string { 
    const month = new Date().getMonth(); 
    if (month >= 2 && month <= 4) { 
      return 'Primavera'; 
    } 
    else if (month >= 5 && month <= 7) { 
      return 'Verano'; 
    } else if (month >= 8 && month <= 10) { 
      return 'Otoño'; 
    } else { 
      return 'Invierno'; 
    } 
  }


}
