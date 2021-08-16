import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleListComponent {}
