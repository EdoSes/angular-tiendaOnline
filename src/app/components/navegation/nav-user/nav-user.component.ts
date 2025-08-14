import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ActivatedRoute,
  Router,
  RouterModule,
} from '@angular/router';

import {
  SeccionDeTitulosComponent,
} from '../../shared-app/title-section/title-section';

//import { FlexLayoutModule }           from '@angular/flex-layout';


@Component({
  selector: 'app-nav-user',
   standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    SeccionDeTitulosComponent
],

  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent {

controlId: any;
badgevisible = true;




constructor (private route         : ActivatedRoute,
             private router        : Router) {}

  badgevisibility() {
    this.badgevisible = false;
  }

  




}
