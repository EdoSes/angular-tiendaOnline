import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
    standalone: true,
  imports: [
    CommonModule,  // expone JsonPipe junto a *ngIf, *ngFor…
    // o bien solo JsonPipe si no necesitas CommonModule:
    // JsonPipe
  ],
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  protectedData: any;

  constructor(private authService: UsersService ) {}

  async ngOnInit(): Promise<void> {
    try { 
      this.protectedData = await this.authService.getProtectedData(); 
    } catch (error) { 
      console.error('Error fetching protected data', error); 
    }

  }

}