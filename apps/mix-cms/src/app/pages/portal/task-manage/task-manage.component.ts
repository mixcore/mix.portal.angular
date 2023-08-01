import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MixDynamicData,
  MixTask,
  PaginationRequestModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { TableContextMenu } from '@mixcore/ui/table';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoModule } from '@ngneat/transloco';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { TuiPaginationModule } from '@taiga-ui/kit';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'mix-task-manage',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    RelativeTimeSpanPipe,
    TuiHostedDropdownModule,
    ReactiveFormsModule,
    MixInputComponent,
    MixTextAreaComponent,
    ReactiveFormsModule,
    MixFormErrorComponent,
    MixEditorComponent,
    TuiDataListModule,
    TuiDropdownModule,
    TaskItemComponent,
    SkeletonLoadingComponent,
    TuiPaginationModule,
  ],
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskManageComponent extends BaseComponent {
  mixApi = inject(MixApiFacadeService);
  cdr = inject(ChangeDetectorRef);
  toast = inject(HotToastService);

  public showAdd = false;
  public taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    taskStatus: new FormControl('New'),
    createdDateTime: new FormControl(new Date()),
    assignee: new FormControl('', Validators.required),
  });

  public contextMenus: TableContextMenu<MixTask>[] = [
    {
      label: 'View',
      action: (item: MixTask) => {
        //
      },
      icon: 'edit',
    },
    {
      label: 'Delete',
      action: (item: MixTask) => {
        this.mixApi.databaseApi
          .deleteData('mixTask', item.id)
          .pipe(
            this.toast.observe({
              loading: 'Deleting task...',
              success: 'Successfully remove task',
              error: 'Something error, please try again later',
            })
          )
          .subscribe({
            next: () => {
              this.loadTask();
            },
          });
      },
      icon: 'delete',
    },
  ];

  public query = signal<PaginationRequestModel>({
    pageIndex: 0,
    pageSize: 30,
  });
  public result = signal<PaginationResultModel<MixTask>>({
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 30,
    },
  });

  constructor() {
    super();

    this.loadTask();
  }

  loadTask() {
    this.mixApi.databaseApi
      .getDataByName<MixTask>('mixTask', this.query())
      .pipe(this.observerLoadingStateSignal())
      .subscribe({
        next: (result) => {
          this.result.set(result);
        },
      });
  }

  submitTask() {
    if (FormHelper.validateForm(this.taskForm)) {
      this.mixApi.databaseApi
        .saveData(
          'mixTask',
          -1,
          this.taskForm.getRawValue() as MixDynamicData,
          'mixTask'
        )
        .subscribe({
          next: () => {
            this.taskForm.controls.title.reset();
            this.taskForm.controls.description.reset();

            this.showAdd = false;
            this.loadTask();
          },
        });
    }
  }

  public onPageChange(index: number) {
    this.query.update((v) => ({ ...v, pageIndex: index }));
    this.loadTask();
  }
}
