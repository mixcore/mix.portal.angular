import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MixColumn, MixFilter } from '@mixcore/lib/model';
import { TrackByProp } from '@mixcore/share/pipe';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DialogService } from '@ngneat/dialog';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { MixSelectComponent } from '../select';
import { FilterItemComponent } from './filter-item/filter-item.component';

export interface DynamicFilterValue {
  column?: MixColumn;
}

export enum LogicalOperate {
  All = 'All',
  AtLeast = 'At least 1',
}

@Component({
  selector: 'mix-dynamic-filter',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixSelectComponent,
    FilterItemComponent,
    TrackByProp,
    TuiBadgeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFilterComponent {
  public dialog = inject(DialogService);
  public cdr = inject(ChangeDetectorRef);

  @Input() public size: 's' | 'm' = 's';
  @Input() columns: MixColumn[] = [];
  @Input() public filters: MixFilter[] = [];
  @Output() public filtersChange = new EventEmitter<MixFilter[]>();
  public validFilterCount = 0;
  public logicalOperateItems = [LogicalOperate.All, LogicalOperate.AtLeast];
  public logicalOperateForm = new FormControl(LogicalOperate.AtLeast);

  public open(tpl: TemplateRef<any>) {
    this.dialog.open(tpl, { resizable: true, draggable: true });
  }

  public add() {
    this.filters.push({
      fieldName: this.columns[0].systemName,
      value: null,
      compareOperator: 'Like',
      isRequired: false,
    });

    this.cdr.detectChanges();
  }

  public onFilterValueChange(value: MixFilter, index: number) {
    this.filters[index] = value;
  }

  public applyChange() {
    this.filters = this.filters
      .filter((x) => x.value)
      .map((f) => {
        f.isRequired = this.logicalOperateForm.value === LogicalOperate.All;
        return f;
      });

    this.validFilterCount = this.filters.length;
    this.filtersChange.emit(this.filters);
  }

  public deleteFilter(value: MixFilter, index: number) {
    this.filters.splice(index, 1);
  }
}
