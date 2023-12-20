import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-custom-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-cell.component.html',
  styleUrl: './custom-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCellComponent {}
