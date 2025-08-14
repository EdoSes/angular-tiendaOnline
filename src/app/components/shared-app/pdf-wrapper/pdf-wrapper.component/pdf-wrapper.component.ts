import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule
  ],
  templateUrl: './pdf-wrapper.component.html',
  styleUrls: ['./pdf-wrapper.component.css']
})
export class PdfWrapperComponent implements OnChanges {
  @Input() fullPath: string[] = [];

  public readonly pageViewMode: 'multiple' | 'single' = 'single';


  constructor(private sanitizer: DomSanitizer) {}

  // This method handles all the logic: sanitizing and type casting.
  getSafeUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnChanges(): void {
    // The ngOnChanges hook is no longer needed to prepare the URLs.
  }

  get validPdfUrls(): string[] {
    console.log("Esta es lo wapper presenta;",this.fullPath) 
    return this.fullPath.filter(url => url.toLowerCase().endsWith('.pdf'));
    
    //return this.validPdfUrls.map(url => this.getSafeUrl(url));

  }
}