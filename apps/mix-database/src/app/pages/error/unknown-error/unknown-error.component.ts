import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'mix-unknown-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unknown-error.component.html',
  styleUrls: ['./unknown-error.component.scss'],
})
export class UnknownErrorComponent {}
