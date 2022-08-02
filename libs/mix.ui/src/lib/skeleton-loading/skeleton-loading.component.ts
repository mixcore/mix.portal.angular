import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mix-skeleton-loading',
  templateUrl: './skeleton-loading.component.html',
  styleUrls: ['./skeleton-loading.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SkeletonLoadingComponent {
  @Input() public type: 'table' | 'card' | 'none' | 'form' = 'none';
}
