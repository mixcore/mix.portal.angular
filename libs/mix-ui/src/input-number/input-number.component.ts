import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiTextfieldControllerModule,
  tuiNumberFormatProvider,
} from '@taiga-ui/core';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-input-number',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    TuiDestroyService,
    tuiNumberFormatProvider({ decimalSeparator: '.', thousandSeparator: ',' }),
  ],
})
export class MixInputNumberComponent
  extends BaseTextControl
  implements ControlValueAccessor, OnInit
{
  destroy$ = inject(TuiDestroyService);

  @Input() type = 'text';
  @Input() override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() floatingLabel = false;
  @Input() searchIcon = false;
  @Input() prefix = '';
  @Input() step = 0;

  @Input() selfControl = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  ngOnInit() {
    if (this.selfControl) this.defaultControl.setValue(this.value);
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.valueChange.emit(v);
    });
  }
}
