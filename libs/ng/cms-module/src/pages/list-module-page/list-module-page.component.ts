import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list-post',
  templateUrl: './list-module-page.component.html',
  styleUrls: ['./list-module-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListModulePageComponent {}
