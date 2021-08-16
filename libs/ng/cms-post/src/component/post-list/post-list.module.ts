import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PostListComponent } from './post-list.component';

@NgModule({
  declarations: [PostListComponent],
  imports: [CommonModule, NzTableModule],
  exports: [PostListComponent]
})
export class PostListModule {}
