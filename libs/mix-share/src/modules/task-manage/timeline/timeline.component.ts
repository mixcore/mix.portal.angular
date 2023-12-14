import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskTypeIcons } from '@mixcore/lib/model';
import { BaseComponent } from '@mixcore/share/base';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DialogService } from '@ngneat/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiGroupModule } from '@taiga-ui/core';
import { TuiRadioBlockModule } from '@taiga-ui/kit';
import {
  GANTT_GLOBAL_CONFIG,
  GanttGroup,
  GanttItem,
  GanttViewType,
  NgxGanttModule,
} from '@worktile/gantt';
import { setDefaultOptions } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { TaskDateDisplayComponent } from '../components/task-date-display/task-date-display.component';
import { TaskManageStore } from '../store/task-ui.store';
import { TaskStore } from '../store/task.store';
setDefaultOptions({ locale: enUS });

@Component({
  selector: 'timeline',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    TranslocoModule,
    NgxGanttModule,
    TaskDateDisplayComponent,
    TuiRadioBlockModule,
    ReactiveFormsModule,
    TuiGroupModule,
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: GANTT_GLOBAL_CONFIG,
      useValue: {
        dateFormat: {
          yearQuarter: `QQQ 'of' yyyy`,
          month: 'LL',
          yearMonth: `LLLL '('yyyy')'`,
          year: `yyyy`,
        },
      },
    },
  ],
})
export class TimelineComponent extends BaseComponent {
  @ViewChild('gantt') ganttElement!: Element;
  public dialog = inject(DialogService);
  public store = inject(TaskStore);
  public taskManage = inject(TaskManageStore);

  public viewType: GanttViewType = GanttViewType.day;
  public items: GanttItem[] = [];
  public groups: GanttGroup[] = [];
  public TaskTypeIcon = TaskTypeIcons;

  readonly modeOptions = [
    GanttViewType.day,
    GanttViewType.month,
    GanttViewType.quarter,
    GanttViewType.year,
  ];
  readonly modeForm = new FormGroup({
    value: new FormControl(GanttViewType.day),
  });

  constructor() {
    super();

    this.store
      .getParentTasks()
      .pipe(takeUntilDestroyed())
      .subscribe((parent) => {
        this.groups = parent.map((p) => ({
          id: p.id.toString(),
          title: p.title,
        }));
      });

    this.store.vm$.pipe(takeUntilDestroyed()).subscribe((v) => {
      this.items = v.data
        .filter((x) => x.parentTaskId)
        .map((x) => ({
          id: x.id.toString(),
          title: x.title,
          start: new Date(x.fromDate!).getTime(),
          end: new Date(x.dueDate!).getTime(),
          group_id: x.parentTaskId?.toString(),
          ['task']: x,
        }));
    });

    this.modeForm.controls.value.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((m) => {
        this.viewType = m!;
      });
  }
}
