import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostListFilterComponent } from './post-list-filter.component';

@NgModule({
  declarations: [PostListFilterComponent],
  imports: [CommonModule],
  exports: [PostListFilterComponent]
})
export class PostListFilterModule {}
