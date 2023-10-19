import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { rubberBandAnimation } from '@mixcore/share/animation';

@Component({
  selector: 'mix-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  animations: [rubberBandAnimation({ duration: 1000, delay: 800 })],
})
export class LoadingScreenComponent {
  bounce = false;
}
