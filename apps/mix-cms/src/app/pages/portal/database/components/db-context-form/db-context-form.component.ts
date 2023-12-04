import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mix-db-context-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './db-context-form.component.html',
  styleUrl: './db-context-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DbContextFormComponent {

}
