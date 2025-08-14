import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilidadService {
  private visible = new BehaviorSubject<boolean>(true);
  visible$ = this.visible.asObservable();

  constructor() { }

  
  mostrarComponente(): void {
    this.visible.next(true);
  }

  ocultarComponente(): void {
    this.visible.next(false);
  }
}



