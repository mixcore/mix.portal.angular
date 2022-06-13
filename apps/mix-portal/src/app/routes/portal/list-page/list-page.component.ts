import { Component } from '@angular/core';
import { MixContentType } from '@mix-spa/mix.lib';
import { MixPolymorphousListComponent, ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  standalone: true,
  imports: [ShareModule, MixPolymorphousListComponent]
})
export class ListPageComponent {
  public type: MixContentType = MixContentType.Page;
}
