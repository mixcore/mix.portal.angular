import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PageListComponent } from './page-list.component';

@NgModule({
  declarations: [PageListComponent],
  imports: [CommonModule, NzTableModule],
  exports: [PageListComponent]
})
export class PageListModule {}
