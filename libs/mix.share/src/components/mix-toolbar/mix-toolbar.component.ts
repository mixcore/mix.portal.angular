import { Component, Input } from '@angular/core';

import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-toolbar',
  templateUrl: './mix-toolbar.component.html',
  styleUrls: ['./mix-toolbar.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class MixToolbarComponent<T> {
  @Input() public selectedItem: T[] = [];
}