import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MixScheduler } from '@mixcore/lib/model';
import { BasePageComponent } from '@mixcore/share/base';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { MixBreadcrumbsModule } from '@mixcore/ui/breadcrumbs';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { DialogService } from '@ngneat/dialog';
import { JobFormComponent } from '../components/job-form/job-form.component';
import { FormatJobNamePipe } from '../helper';
import { SchedulerStore } from '../stores/schedulers.store';

@Component({
  selector: 'mix-schedulers',
  standalone: true,
  imports: [
    CommonModule,
    MixDataTableModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixBreadcrumbsModule,
    JobFormComponent,
    FormatJobNamePipe,
  ],
  templateUrl: './schedulers.component.html',
  styleUrl: './schedulers.component.scss',
})
export class SchedulersComponent extends BasePageComponent {
  public store = inject(SchedulerStore);
  public dialog = inject(DialogService);

  public selectedItems?: MixScheduler;
  public contextMenus: TableContextMenu<MixScheduler>[] = [
    {
      label: 'Edit',
      action: (item) => {},
      icon: 'edit',
    },
    {
      label: 'Delete',
      action: (item) => {},
      icon: 'delete',
    },
  ];

  public addJob() {
    this.dialog.open(JobFormComponent, {
      ...JobFormComponent.dialogOption,
    });
  }

  public editJob(job: MixScheduler) {
    this.dialog.open(JobFormComponent, {
      ...JobFormComponent.dialogOption,
      data: {
        job: job,
      },
    });
  }
}
