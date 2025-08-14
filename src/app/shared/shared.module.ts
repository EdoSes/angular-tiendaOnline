// src/app/shared/shared.module.ts

// CDK
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedMaterialModule } from './SharedMaterialModule';

@NgModule({
  imports: [
    CommonModule,
    CdkTreeModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule 
  ],
  exports: [
    CommonModule,
    CdkTreeModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule, 
  ]
})
export class SharedModule {}

