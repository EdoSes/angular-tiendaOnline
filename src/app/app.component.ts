// Angular CDK
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
// src/app/app.component.ts
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

// Tu módulo compartido
import { SharedMaterialModule } from './shared/SharedMaterialModule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,         // ngIf, ngFor, etc.
    RouterOutlet,         // <router-outlet>
    CdkTreeModule,        // E.g. <cdk-tree>
    MatToolbarModule,     // <mat-toolbar>
    MatButtonModule,      // <button mat-button>
    SharedMaterialModule,         // Todo lo que reexportes ahí
  ],
  template: `<app-prod-imagenes></app-prod-imagenes>`,

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
