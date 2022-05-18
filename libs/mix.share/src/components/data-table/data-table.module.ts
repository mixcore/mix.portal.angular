import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiReorderModule, TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiHostedDropdownModule, TuiLoaderModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiCheckboxModule, TuiInputCountModule, TuiInputModule, TuiPaginationModule } from '@taiga-ui/kit';

import { RelativeTimeSpanModule } from '../../_core/pipes/relative-timepsan.pipe';
import { WemeDataTableComponent } from './data-table.component';
import { TableCellDirective } from './directives/cell.directive';
import { TableColumnDirective } from './directives/column.directive';
import { TableHeaderDirective } from './directives/header.directive';

@NgModule({
  declarations: [WemeDataTableComponent, TableHeaderDirective, TableCellDirective, TableColumnDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTableModule,
    TuiInputModule,
    TuiInputCountModule,
    TuiHostedDropdownModule,
    TuiReorderModule,
    TuiTextfieldControllerModule,
    TuiTablePaginationModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiCheckboxModule,
    TuiPaginationModule,
    RelativeTimeSpanModule
  ],
  exports: [WemeDataTableComponent, TableHeaderDirective, TableCellDirective, TableColumnDirective]
})
export class WemeDataTableModule {}
