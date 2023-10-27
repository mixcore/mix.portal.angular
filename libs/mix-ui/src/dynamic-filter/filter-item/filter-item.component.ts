import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  CompareOperator,
  CompareOperatorDisplay,
  MixColumn,
} from '@mixcore/lib/model';
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
    ReactiveFormsModule,
    FilterInputComponent,
  ],
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss'],
})
export class FilterItemComponent {
  @Input() columns: MixColumn[] = [];
  public columnLabel = (col: MixColumn) => (col ? col.displayName : '');

  @Input() public operators = Object.keys(CompareOperatorDisplay);
  public operatorLabel = (opr: CompareOperator) =>
    opr ? CompareOperatorDisplay[opr] : '';

  // public valueData = {};
  // public fields: FormlyFieldConfig[] = [];
  // public valueForm = inject(FormBuilder).group({
  //   value: null,
  // });
  public form = inject(FormBuilder).group({
    column: <MixColumn>{},
    operator: {},
  });

  constructor() {
    // this.form.controls.column.valueChanges
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((col: MixColumn | null) => {
    //     if (!col) return;
    //     this.valueData = Utils.initFormFieldDefaultValue(
    //       col.dataType,
    //       this.valueData
    //     );
    //     this.fields = [
    //       {
    //         key: 'value',
    //         type: col.dataType,
    //         props: {
    //           label: 'Value',
    //         },
    //       },
    //     ];
    //   });
  }

  ngOnInit() {
    this.form.controls.column.patchValue(this.columns[0]);
    this.form.controls.operator.patchValue(this.operators[0]);
  }
}
