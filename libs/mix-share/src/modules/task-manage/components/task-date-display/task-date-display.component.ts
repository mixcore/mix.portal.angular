import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MixTaskNew } from '@mixcore/lib/model';

@Component({
  selector: 'task-date-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-date-display.component.html',
  styleUrl: './task-date-display.component.scss',
})
export class TaskDateDisplayComponent {
  @Input() public task!: MixTaskNew;
}
