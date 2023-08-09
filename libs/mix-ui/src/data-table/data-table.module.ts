import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
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
import { MixButtonComponent } from '../button';
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
    MixButtonComponent,
    DragDropModule,
    TuiProgressModule,
    TuiDropdownModule,
    TuiDataListModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiHostedDropdownModule,
    ScrollingModule,
  ],
  exports: [
    DataTableComponent,
    TableHeaderDirective,
    TableCellDirective,
    TableColumnDirective,
  ],
})
export class MixDataTableModule {}
