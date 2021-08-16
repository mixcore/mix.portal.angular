import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'post-list-filter',
  templateUrl: './post-list-filter.component.html',
  styleUrls: ['./post-list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListFilterComponent {}
