import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list-page',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageListComponent {}
