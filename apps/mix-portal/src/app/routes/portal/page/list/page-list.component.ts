import { Component } from '@angular/core';
import { MixContentType } from '@mix-spa/mix.lib';
import {
  BaseComponent,
  MixPolymorphousListComponent,
  ShareModule
} from '@mix-spa/mix.share';

@Component({
  selector: 'mix-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  standalone: true,
  imports: [ShareModule, MixPolymorphousListComponent]
})
export class PageListComponent extends BaseComponent {
  public type: MixContentType = MixContentType.Page;

  constructor() {
    super();
  }
}
