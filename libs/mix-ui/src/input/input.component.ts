import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-input',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [TuiDestroyService],
  encapsulation: ViewEncapsulation.None,
})
export class MixInputComponent
  extends BaseTextControl
  implements ControlValueAccessor, OnInit
{
  destroy$ = inject(TuiDestroyService);

  @Input() type = 'text';
  @Input() override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() floatingLabel = false;
  @Input() searchIcon = false;
  @Input() autoCompleteItems: string[] = [];
  @Input() autocomplete = '';
  @Input() name = '';
  @Input() id = '';
  @Input() autofill = '';
  @Input() closable = true;

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
