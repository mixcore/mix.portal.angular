import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'project',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixSubToolbarComponent,
    TranslocoModule,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {}
