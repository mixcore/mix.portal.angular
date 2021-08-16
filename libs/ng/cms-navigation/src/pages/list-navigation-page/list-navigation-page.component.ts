import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list-navigation-page',
  templateUrl: './list-navigation-page.component.html',
  styleUrls: ['./list-navigation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListNavigationPageComponent {}
