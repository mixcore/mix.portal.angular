import { CommonModule } from '@angular/common';
import {
  Component,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CompareOperator, DataType, MixFilter } from '@mixcore/lib/model';
import { DialogService } from '@ngneat/dialog';
import { TippyDirective } from '@ngneat/helipopper';
import { MixButtonComponent } from '../button';

export interface DynamicFilterValue {
  value: string | number | null | Date;
  compareOperator: CompareOperator;
}

export interface DynamicFilter {
  displayName: string;
  systemName: string;
  dataType: DataType;
  value: DynamicFilterValue[];
}

@Component({
  selector: 'mix-dynamic-filter',
  standalone: true,
  imports: [CommonModule, MixButtonComponent, TippyDirective],
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFilterComponent {
  public dialog = inject(DialogService);
  public defaultMixFilters: MixFilter[] = [
    {
      fieldName: 'status',
      value: null,
      compareOperator: 'GreaterThanOrEqual',
      displayName: 'Status',
      type: 'select',
    },
    {
      fieldName: 'createdDateTime',
      value: null,
      compareOperator: 'GreaterThanOrEqual',
      displayName: 'Created Date',
      type: 'date',
    },
    {
      fieldName: 'updatedDateTime',
      value: null,
      compareOperator: 'GreaterThanOrEqual',
      displayName: 'Updated Date',
      type: 'date',
    },
  ];

  open(tpl: TemplateRef<any>) {
    this.dialog.open(tpl, { resizable: true, draggable: true });
  }
}
