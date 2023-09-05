import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiDataListModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiMultiSelectModule,
  TuiPaginationModule,
} from '@taiga-ui/kit';
import { MixButtonComponent } from '../button';
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
    FormsModule,
    ReactiveFormsModule,
    MixButtonComponent,
    DragDropModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiMultiSelectModule,
    TippyDirective,
  ],
  exports: [
    DataTableComponent,
    TableHeaderDirective,
    TableCellDirective,
    TableColumnDirective,
  ],
})
export class MixDataTableModule {}
