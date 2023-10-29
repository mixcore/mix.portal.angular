import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  CompareOperator,
  MixColumn,
  MixFilter,
  OperatorDisplay,
} from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { FilterInputComponent } from '../filter-input/filter-input.component';

@Component({
  selector: 'mix-filter-item',
  standalone: true,
  imports: [
    CommonModule,
    MixSelectComponent,
    MixInputComponent,
    MixButtonComponent,
    ReactiveFormsModule,
    FilterInputComponent,
  ],
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
})
export class FilterItemComponent {
  public destroyRef = inject(DestroyRef);

  @Input() filter!: MixFilter;
  @Input() public columns: MixColumn[] = [];
  @Input() public operators = Object.keys(OperatorDisplay);
  public columnLabel = (col: MixColumn) => col?.displayName ?? '';
  public operatorLabel = (opr: CompareOperator) => OperatorDisplay?.[opr] ?? '';
  public form = inject(FormBuilder).group({
    column: <MixColumn>{},
    operator: <string>{},
  });

  @Output() public filterChange = new EventEmitter();

  ngOnInit() {
    this.form.controls.column.patchValue(
      this.columns.find((x) => x.systemName === this.filter.fieldName) ??
        this.columns[0]
    );

    this.form.controls.operator.patchValue(
      this.operators.find((x) => x === this.filter.compareOperator) ??
        this.operators[0]
    );

    this.form.controls.column.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.filter.fieldName = v!.systemName;
        this.filter.value = '';
        this.filterChange.emit(this.filter);
      });

    this.form.controls.operator.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.filter.compareOperator = v as CompareOperator;
        this.filterChange.emit(this.filter);
      });
  }

  public filterValueChange(value: string) {
    this.filter.value = value;
    this.filterChange.emit(this.filter);
  }
}
