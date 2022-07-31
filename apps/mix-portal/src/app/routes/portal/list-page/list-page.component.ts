import { Component } from '@angular/core';
import { MixContentType } from '@mix-spa/mix.lib';
import {
  BaseComponent,
  MixPolymorphousListComponent,
  ShareModule
} from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  standalone: true,
  imports: [ShareModule, MixPolymorphousListComponent]
})
export class ListPageComponent extends BaseComponent {
  public type: MixContentType = MixContentType.Page;

  constructor() {
    super();
  }
}
