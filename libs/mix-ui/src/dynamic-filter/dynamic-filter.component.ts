import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MixButtonComponent } from '../button';

@Component({
  selector: 'mix-dynamic-filter',
  standalone: true,
  imports: [CommonModule, MixButtonComponent],
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
})
export class DynamicFilterComponent {}
