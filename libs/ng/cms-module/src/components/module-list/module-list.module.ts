import { CommonModule } from '@angular/common';
import { ModuleListComponent } from './module-list.component';
import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [ModuleListComponent],
  imports: [CommonModule, NzTableModule],
  exports: [ModuleListComponent]
})
export class ModuleListModule {}
