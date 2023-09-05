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
import { TuiDestroyService, tuiControlValue } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { Observable, map, takeUntil } from 'rxjs';
import { BaseTextControl } from '../base/base-text.control';

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
  @Input() closable = true;

  @Input() selfControl = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  public autoCompleteItems$?: Observable<string[]>;

  ngOnInit() {
    this.autoCompleteItems$ = tuiControlValue<string>(this.control).pipe(
      takeUntil(this.destroy$),
      map((value) => {
        if (!this.autoCompleteItems.length) return [];

        const filtered = this.autoCompleteItems.filter((item) =>
          item.includes(value)
        );

        return filtered;
      })
    );

    if (this.selfControl) this.defaultControl.setValue(this.value);
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.valueChange.emit(v);
    });
  }
}
