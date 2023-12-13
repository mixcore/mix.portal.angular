import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MixTaskNew } from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiDay, TuiDayRange, TuiMonth } from '@taiga-ui/cdk';
import { TuiCalendarModule } from '@taiga-ui/core';

@Component({
  selector: 'start-end-date',
  standalone: true,
  imports: [
    CommonModule,
    TippyDirective,
    TuiCalendarModule,
    MixButtonComponent,
  ],
  templateUrl: './start-end-date.component.html',
  styleUrl: './start-end-date.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StartEndDateComponent {
  @Input() public task!: MixTaskNew;

  public value: TuiDayRange | null = null;

  public firstMonth = TuiMonth.currentLocal();
  public lastMonth = TuiMonth.currentLocal().append({ month: 1 });
  public hoveredItem: TuiDay | null = null;

  ngOnInit() {
    this.value = new TuiDayRange(
      TuiDay.fromLocalNativeDate(new Date()),
      TuiDay.fromLocalNativeDate(new Date())
    );

    const taskFromDate = new Date(
      this.task.fromDate ?? this.task.createdDateTime
    );
    const taskDueDate = this.task.dueDate ? new Date(this.task.dueDate) : null;
    this.firstMonth = new TuiMonth(
      taskFromDate.getFullYear(),
      taskFromDate.getMonth()
    );

    if (!taskDueDate) {
      this.value = new TuiDayRange(
        TuiDay.fromLocalNativeDate(taskFromDate),
        TuiDay.fromLocalNativeDate(taskFromDate)
      );

      this.lastMonth = this.firstMonth.append({ month: 1 });
    } else {
      this.value = new TuiDayRange(
        TuiDay.fromLocalNativeDate(taskFromDate),
        TuiDay.fromLocalNativeDate(taskDueDate)
      );
      this.lastMonth = new TuiMonth(
        taskDueDate.getFullYear(),
        taskDueDate.getMonth()
      );
    }
  }

  onMonthChangeFirst(month: TuiMonth): void {
    this.firstMonth = month;
    this.lastMonth = month.append({ month: 1 });
  }

  onMonthChangeLast(month: TuiMonth): void {
    this.firstMonth = month.append({ month: -1 });
    this.lastMonth = month;
  }

  onDayClick(day: TuiDay): void {
    if (this.value === null || !this.value.isSingleDay) {
      this.value = new TuiDayRange(day, day);
    }

    this.value = TuiDayRange.sort(this.value.from, day);
  }
}
