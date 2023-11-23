import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DataType, DataTypeColors, DataTypeDisplay } from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TippyDirective } from '@ngneat/helipopper';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams, SortDirection } from 'ag-grid-community';

export interface ICustomHeaderParams {
  displayName: string;
  dataType: DataType;
  columnType: 'check' | 'action' | 'value';
}

@Component({
  selector: 'mix-custom-header',
  standalone: true,
  imports: [CommonModule, MixButtonComponent, TippyDirective],
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomHeaderComponent implements IHeaderAngularComp {
  public params!: IHeaderParams & ICustomHeaderParams;
  public ascSort!: string;
  public descSort!: string;
  public noSort!: string;
  public isPinned = false;
  public parentComp: any;

  readonly drinks = ['Cola', 'Tea', 'Coffee', 'Slurm'];
  readonly dataTypeColors = DataTypeColors;
  readonly dataTypeDisplay = DataTypeDisplay;

  public icon = '';
  public iconSize = '';
  public text = '';
  public color = '';

  public agInit(params: IHeaderParams & ICustomHeaderParams): void {
    this.params = params;
    this.isPinned = !!params.column.getPinned();
    this.parentComp = this.params.context.componentParent;

    const dataType = this.params['dataType'];
    this.icon = DataTypeDisplay[dataType]?.icon || 'Default';
    this.iconSize = DataTypeDisplay[dataType]?.iconSize || '16px';
    this.color = DataTypeColors[dataType] || '#000';
    this.text = params['displayName'] || 'Default';

    params.column.addEventListener(
      'sortChanged',
      this.onSortChanged.bind(this)
    );
  }

  public onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive';
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active';
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active';
    } else {
      this.noSort = 'active';
    }
  }

  public onSortRequested(order: SortDirection, event: any) {
    this.params.setSort(order, event.shiftKey);
  }

  public pinColumn() {
    const pinned = this.isPinned ? false : 'left';
    this.params.columnApi.setColumnPinned(
      this.params.column.getColId(),
      pinned
    );
  }

  public refresh(params: IHeaderParams<any, any>): boolean {
    return false;
  }
}
