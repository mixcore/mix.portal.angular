import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixInputComponent } from '@mixcore/ui/input';

@Component({
  selector: 'job-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixInputComponent,
    MixDatePickerComponent,
    MixButtonComponent,
  ],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFormComponent {
  public static dialogOption = {
    windowClass: 'mix-record-form-dialog top-align-modal interact-modal',
    minWidth: '800px',
    maxWidth: '95vw',
  };
}
