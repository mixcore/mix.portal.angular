import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiCheckboxModule,
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiPaginationModule,
  TuiProgressModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { MixInputComponent } from '../input';
import { DataTableComponent } from './data-table.component';
import { TableCellDirective } from './directives/cell.directive';
import { TableColumnDirective } from './directives/column.directive';
import { TableHeaderDirective } from './directives/header.directive';

@NgModule({
  declarations: [
    DataTableComponent,
    TableHeaderDirective,
    TableCellDirective,
    TableColumnDirective,
  ],
  imports: [
    TuiTableModule,
    CommonModule,
    TuiLoaderModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiPaginationModule,
    TuiCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MixInputComponent,
    DragDropModule,
    TuiProgressModule,
    TuiDropdownModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
  ],
  exports: [
    DataTableComponent,
    TableHeaderDirective,
    TableCellDirective,
    TableColumnDirective,
  ],
})
export class MixDataTableModule {}
