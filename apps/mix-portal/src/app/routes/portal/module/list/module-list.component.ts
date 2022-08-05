import { Component } from '@angular/core';
import { MixContentType } from '@mix-spa/mix.lib';
import { MixPolymorphousListComponent, ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  standalone: true,
  imports: [ShareModule, MixPolymorphousListComponent]
})
export class ModuleListComponent {
  public type: MixContentType = MixContentType.Module;
}
