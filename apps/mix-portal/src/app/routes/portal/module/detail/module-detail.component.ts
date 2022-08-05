import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'mix-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ModuleDetailComponent {}
