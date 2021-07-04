import { BaseComponent, ComponentType } from '@coreng/angular-core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-portal-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent extends BaseComponent<ComponentType.Smart> {}
