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
import { TuiDestroyService, tuiPure } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';

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

  @Input() public items: any = [];
  @Input() public labelKey = '';
  @Input() public override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() labelProcess?: (item: any) => string = undefined;

  @tuiPure
  stringify(item: any) {
    if (!this.labelProcess)
      return `${this.labelKey ? item[this.labelKey] || '' : item}`;

    return this.labelProcess(item);
  }

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
