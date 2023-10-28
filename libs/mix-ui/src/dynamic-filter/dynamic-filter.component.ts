import { CommonModule } from '@angular/common';
import {
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

import { MixButtonComponent } from '@mixcore/ui/button';
import { DialogService } from '@ngneat/dialog';
import { TippyDirective } from '@ngneat/helipopper';
import { FilterItemComponent } from './filter-item/filter-item.component';

export interface DynamicFilterValue {
  column?: MixColumn;
}

@Component({
  selector: 'mix-dynamic-filter',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    TippyDirective,
    FilterItemComponent,
    TrackByProp,
  ],
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFilterComponent {
  public dialog = inject(DialogService);

  @Input() public size: 's' | 'm' = 's';
  @Input() columns: MixColumn[] = [];
  @Input() public filters: MixFilter[] = [];
  @Output() public filtersChange = new EventEmitter<MixFilter[]>();

  public open(tpl: TemplateRef<any>) {
    this.dialog.open(tpl, { resizable: true, draggable: true });
  }

  public add() {
    this.filters.push({
      fieldName: this.columns[0].systemName,
      value: null,
      compareOperator: 'Like',
    });
  }

  public onFilterValueChange(value: MixFilter, index: number) {
    this.filters[index] = value;
    this.filtersChange.emit(this.filters);
  }
}
