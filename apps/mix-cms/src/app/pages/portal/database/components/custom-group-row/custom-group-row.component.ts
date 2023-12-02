import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-custom-group-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-group-row.component.html',
  styleUrl: './custom-group-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomGroupRowComponent {}
