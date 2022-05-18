import { ContentChild, Directive, Input } from '@angular/core';

import { ColumnType } from '../data-table.model';
import { TableCellDirective } from './cell.directive';
import { TableHeaderDirective } from './header.directive';

@Directive({
  selector: '[wemeTableColumn]'
})
export class TableColumnDirective {
  @Input() public header: string = '';
  @Input() public key: string = '';
  @Input() public sortable: boolean = true;
  @Input() public columnType: ColumnType = 'DATA';
  @Input() public showHeader: boolean = true;
  @Input() public width: string | undefined;

  @ContentChild(TableCellDirective, { static: true }) public tplCell?: TableCellDirective;
  @ContentChild(TableHeaderDirective, { static: true }) public tplHeader?: TableHeaderDirective;
}
