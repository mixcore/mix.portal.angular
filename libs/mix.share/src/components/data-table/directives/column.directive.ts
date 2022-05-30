import { ContentChild, Directive, Input } from '@angular/core';

import { ColumnType } from '../data-table.model';
import { TableCellDirective } from './cell.directive';
import { TableHeaderDirective } from './header.directive';

@Directive({
  selector: '[mixTableColumn]'
})
export class TableColumnDirective {
  @Input() public header = '';
  @Input() public key = '';
  @Input() public sortable = true;
  @Input() public columnType: ColumnType = 'DATA';
  @Input() public showHeader = true;
  @Input() public width: string | undefined;

  @ContentChild(TableCellDirective, { static: true }) public tplCell?: TableCellDirective;
  @ContentChild(TableHeaderDirective, { static: true }) public tplHeader?: TableHeaderDirective;
}
