import { Component } from '@angular/core';

import { ShareModule } from '../../../share.module';

@Component({
  selector: 'mix-universal-search',
  templateUrl: './universal-search.component.html',
  styleUrls: ['./universal-search.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class UniversalSearchComponent {
  public activeItemIndex = 0;
  public searchText = '';
}
