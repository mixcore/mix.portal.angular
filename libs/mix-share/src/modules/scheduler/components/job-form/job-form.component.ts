import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MixScheduler } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixDateTimePickerComponent } from '@mixcore/ui/date-time-picker';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixInputCronComponent } from '@mixcore/ui/input-cron';
import { MixInputNumberComponent } from '@mixcore/ui/input-number';
import { MixToggleComponent } from '@mixcore/ui/toggle';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'job-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixInputComponent,
    MixDatePickerComponent,
    MixButtonComponent,
    MixInputCronComponent,
    MixInputNumberComponent,
    MixToggleComponent,
    MixDateTimePickerComponent,
  ],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFormComponent extends BaseComponent {
  public static dialogOption = {
    windowClass: 'mix-record-form-dialog top-align-modal interact-modal',
    minWidth: '800px',
    maxWidth: '95vw',
  };

  public ref = inject(DialogRef);
  public api = inject(MixApiFacadeService);
  public toast = inject(HotToastService);

  public jobForm = inject(FormBuilder).group({
    cronExpression: ['5 * * * *'],
    description: [''],
    groupName: [''],
    interval: [null],
    intervalType: ['Minute'],
    isStartNow: [true],
    jobData: [],
    jobName: ['Mix.Scheduler.Domain.Jobs.KeepPoolAliveJob'],
    name: [''],
    repeatCount: [null],
    startAt: [null],
    endAt: [null],
  });

  public submit() {
    this.api.schedulerApi
      .create(this.jobForm.value as unknown as MixScheduler)
      .pipe(this.observerLoadingStateSignal())
      .subscribe({
        next: (result) => {
          this.toast.success('Successfully create new job');
          this.ref.close({ data: result });
        },
        error: () => {
          this.toast.error('Something error, please try again later');
        },
      });
  }
}
