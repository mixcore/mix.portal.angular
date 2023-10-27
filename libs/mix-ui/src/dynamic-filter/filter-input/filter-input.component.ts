import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MixInputComponent } from '../../input/input.component';

@Component({
  selector: 'mix-filter-input',
  standalone: true,
  imports: [CommonModule, MixInputComponent],
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent {}
