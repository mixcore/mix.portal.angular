import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataType } from '@mixcore/lib/model';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixInputNumberComponent } from '@mixcore/ui/input-number';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'mix-filter-input',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    MixDatePickerComponent,
    MixInputNumberComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent {
  @Output() valueChange = new EventEmitter();

  public inputType: 'Text' | 'DatePicker' | 'Number' = 'Text';
  public control = new FormControl();

  @Input() public set dataType(v: DataType) {
    this._dataType = v;

    switch (v) {
      case DataType.DateTime:
        this.inputType = 'DatePicker';
        break;
      case DataType.Integer:
        this.inputType = 'Number';
        break;
      default:
        this.inputType = 'Text';
    }
  }

  public get dataType() {
    return this._dataType;
  }
  private _dataType: DataType = DataType.Text;

  constructor() {
    this.control.valueChanges
      .pipe(takeUntilDestroyed(), debounceTime(300))
      .subscribe((v) => this.valueChange.emit(v));
  }
}
