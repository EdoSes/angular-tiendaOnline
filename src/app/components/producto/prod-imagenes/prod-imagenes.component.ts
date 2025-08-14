import { CommonModule } from '@angular/common';
import {
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';

import { FileUploadService } from '../../../services/file-upload.service';
import { SharedMaterialModule } from '../../../shared/SharedMaterialModule';
import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';

@Component({
  selector: 'app-prod-imagenes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    SeccionDeTitulosComponent,
    RouterModule
],
  templateUrl: './prod-imagenes.component.html',
  styleUrl: './prod-imagenes.component.css'
})
export class ProdImagenesComponent implements OnInit{
  
  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;
  nombreProducto: any;

  constructor(private uploadService: FileUploadService) { }
  
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.progress = 0;
    this.message = "";

    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
  }
}