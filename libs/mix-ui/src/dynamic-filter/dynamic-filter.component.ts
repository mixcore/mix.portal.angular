import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MixColumn } from '@mixcore/lib/model';
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
  ],
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicFilterComponent {
  @Input() public size: 's' | 'm' = 's';
  @Input() columns: MixColumn[] = [];

  public dialog = inject(DialogService);
  public filters: DynamicFilterValue[] = [];

  public control = new FormControl();

  public open(tpl: TemplateRef<any>) {
    this.dialog.open(tpl, { resizable: true, draggable: true });
  }

  public add() {
    this.filters.push({});
  }
}
