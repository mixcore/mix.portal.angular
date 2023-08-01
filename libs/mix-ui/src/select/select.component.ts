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
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';
import { BaseTextControl } from '../base/base-text.control';

export function buildSelectOption(
  items: object[],
  label: string,
  value: string | undefined = undefined
): SelectOption[] {
  return items.map((i: unknown) => ({
    label: (i as any)[label],
    value: value ? (i as any)[value] : i,
  }));
}

export interface SelectOption {
  value: object;
  label: string;
}

@Component({
  selector: 'mix-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiStringifyContentPipeModule,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [TuiDestroyService],
})
export class MixSelectComponent
  extends BaseTextControl
  implements ControlValueAccessor, OnInit
{
  destroy$ = inject(TuiDestroyService);

  @Input() public items: Record<string, object>[] = [];
  @Input() public labelKey = '';
  @Input() public override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() public stringify = (
    item: Record<string, object | string | number>
  ): string => `${this.labelKey ? item[this.labelKey] : item}`;

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
