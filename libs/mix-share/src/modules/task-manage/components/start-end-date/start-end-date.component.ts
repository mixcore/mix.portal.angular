import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
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
  @Output() public taskDateChange = new EventEmitter<{
    fromDate: Date;
    dueDate: Date | undefined;
  }>();

  public value: TuiDayRange | null = null;

  public firstMonth = TuiMonth.currentLocal();
  public lastMonth = TuiMonth.currentLocal().append({ month: 1 });
  public hoveredItem: TuiDay | null = null;

  ngOnInit() {
    const taskFromDate = new Date(
      this.task.fromDate ?? this.task.createdDateTime!
    );
    const taskDueDate = this.task.dueDate ? new Date(this.task.dueDate) : null;
    this.firstMonth = new TuiMonth(
      taskFromDate.getFullYear(),
      taskFromDate.getMonth()
    );

    if (!taskDueDate) {
      this.value = new TuiDayRange(
        TuiDay.fromUtcNativeDate(taskFromDate),
        TuiDay.fromUtcNativeDate(taskFromDate)
      );

      this.lastMonth = this.firstMonth.append({ month: 1 });
    } else {
      this.value = new TuiDayRange(
        TuiDay.fromUtcNativeDate(taskFromDate),
        TuiDay.fromUtcNativeDate(taskDueDate)
      );

      const endMonth = taskDueDate.getMonth();
      const endYear = taskDueDate.getFullYear();

      if (
        endMonth === taskFromDate.getMonth() &&
        endYear === taskFromDate.getFullYear()
      ) {
        this.lastMonth = this.firstMonth.append({ month: 1 });
      } else {
        this.lastMonth = new TuiMonth(
          taskDueDate.getFullYear(),
          taskDueDate.getMonth()
        );
      }
    }
  }

  public onMonthChangeFirst(month: TuiMonth): void {
    this.firstMonth = month;
    this.lastMonth = month.append({ month: 1 });
  }

  public onMonthChangeLast(month: TuiMonth): void {
    this.firstMonth = month.append({ month: -1 });
    this.lastMonth = month;
  }

  public onDayClick(day: TuiDay): void {
    if (this.value === null || !this.value.isSingleDay) {
      this.value = new TuiDayRange(day, day);
    }

    this.value = TuiDayRange.sort(this.value.from, day);
  }

  public onSave() {
    this.taskDateChange.emit({
      fromDate: this.value!.from.toUtcNativeDate(),
      dueDate: this.value!.isSingleDay
        ? undefined
        : this.value?.to.toUtcNativeDate(),
    });
  }
}
