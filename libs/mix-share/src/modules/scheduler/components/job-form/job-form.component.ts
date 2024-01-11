import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
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
import { MixJsonEditorComponent } from '@mixcore/ui/json';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixToggleComponent } from '@mixcore/ui/toggle';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { FormatJobNamePipe } from '../../helper';

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
    MixJsonEditorComponent,
    MixSelectComponent,
  ],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormatJobNamePipe],
})
export class JobFormComponent extends BaseComponent {
  public static dialogOption = {
    windowClass: 'mix-record-form-dialog top-align-modal interact-modal',
    minWidth: '1024px',
    maxWidth: '95vw',
  };

  public ref = inject(DialogRef);
  public api = inject(MixApiFacadeService);
  public toast = inject(HotToastService);
  public mode = signal<'Edit' | 'Create'>('Create');
  public defaultData = {
    data: {
      type: 'Info',
      from: {
        connectionId: '',
        userName: '',
        avatar: '',
      },
      title: 'value',
      message: 'content',
      data: {},
    },
  };

  public jobNameTransform = inject(FormatJobNamePipe);
  public jobNameOptions = [
    'Mix.Scheduler.Domain.Jobs.KeepPoolAliveJob',
    'Mix.Scheduler.Domain.Jobs.PublishScheduledPostsJob',
    'Mix.Scheduler.Domain.Jobs.SendMessageQueueJob',
    'Mix.Scheduler.Domain.Jobs.SendPortalMessageJob',
  ];
  public jobNameStringify = (job: string) =>
    this.jobNameTransform.transform(job);

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
    data: [this.defaultData],
  });

  ngOnInit() {
    if (this.ref.data?.job) {
      this.mode.set('Edit');
      this.jobForm.patchValue(this.ref.data.job);
      const dataString = this.ref.data.job.trigger.jobDataMap.data;
      this.jobForm.controls.data.patchValue(JSON.parse(dataString));
    }
  }

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
