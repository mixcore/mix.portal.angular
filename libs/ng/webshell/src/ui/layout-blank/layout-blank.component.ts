import { BaseComponent, ComponentType } from '@coreng/angular-core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-blank-layout',
  templateUrl: './layout-blank.component.html',
  styleUrls: ['./layout-blank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutBlankComponent extends BaseComponent<ComponentType.Smart> {}
