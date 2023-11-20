import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MixInputTagComponent } from '@mixcore/ui/input-tag';

@Component({
  selector: 'mix-database-permission',
  standalone: true,
  imports: [CommonModule, MixInputTagComponent],
  templateUrl: './database-permission.component.html',
  styleUrl: './database-permission.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabasePermissionComponent {}
