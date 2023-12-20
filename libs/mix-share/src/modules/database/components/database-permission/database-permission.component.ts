import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MixInputTagComponent } from '@mixcore/ui/input-tag';

@Component({
  selector: 'mix-database-permission',
  standalone: true,
  imports: [CommonModule, MixInputTagComponent, ReactiveFormsModule],
  templateUrl: './database-permission.component.html',
  styleUrl: './database-permission.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabasePermissionComponent {
  @Input() public form!: FormGroup;
}
