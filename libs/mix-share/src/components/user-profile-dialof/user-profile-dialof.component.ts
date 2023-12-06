import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'user-profile-dialof',
  standalone: true,
  imports: [CommonModule, MixInputComponent, MixButtonComponent],
  templateUrl: './user-profile-dialof.component.html',
  styleUrl: './user-profile-dialof.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileDialofComponent {
  public static windowClass = 'top-align-modal';
  public dialogRef = inject(DialogRef);
}
