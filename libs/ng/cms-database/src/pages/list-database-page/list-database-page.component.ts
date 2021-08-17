import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list-database-page',
  templateUrl: './list-database-page.component.html',
  styleUrls: ['./list-database-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDatabasePageComponent {}
