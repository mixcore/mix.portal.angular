import { Component } from '@angular/core';
import { MixContentType } from '@mix-spa/mix.lib';
import { MixPolymorphousListComponent, ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.scss'],
  standalone: true,
  imports: [ShareModule, MixPolymorphousListComponent]
})
export class ListModuleComponent {
  public type: MixContentType = MixContentType.Module;
}
