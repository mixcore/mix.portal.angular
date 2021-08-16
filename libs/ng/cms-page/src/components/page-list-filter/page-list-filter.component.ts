import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-list-filter',
  templateUrl: './page-list-filter.component.html',
  styleUrls: ['./page-list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListFilterComponent {}
