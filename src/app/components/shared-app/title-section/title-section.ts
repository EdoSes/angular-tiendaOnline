import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-title-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-section.html',
  styleUrls: ['./title-section.css']
})
export class SeccionDeTitulosComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() highlight: string = '';
}