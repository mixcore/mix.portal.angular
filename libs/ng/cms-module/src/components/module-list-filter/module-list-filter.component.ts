import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'module-list-filter',
  templateUrl: './module-list-filter.component.html',
  styleUrls: ['./module-list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleListFilterComponent {}
