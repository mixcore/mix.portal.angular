import { CommonModule } from '@angular/common';
import { ModuleListFilterComponent } from './module-list-filter.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ModuleListFilterComponent],
  imports: [CommonModule],
  exports: [ModuleListFilterComponent]
})
export class ModuleListFilterModule {}
