import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mix-skeleton-loading',
  templateUrl: './skeleton-loading.component.html',
  styleUrls: ['./skeleton-loading.component.scss'],
  standalone: true,
  imports: [NgIf],
})
export class SkeletonLoadingComponent {
  @Input() public type: 'table' | 'card' | 'none' | 'form' | 'inline' = 'none';
}
