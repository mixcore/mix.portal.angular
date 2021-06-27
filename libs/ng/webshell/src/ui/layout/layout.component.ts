import { BaseComponent, ComponentType } from '@coreng/angular-core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ISidebarMenuItem } from '../sidebar/sidebar.component';

@Component({
  selector: 'mix-portal-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent extends BaseComponent<ComponentType.Smart> {
  public sideBarMenuItems: ISidebarMenuItem[] = [
    {
      title: 'Dashboard',
      routerLink: [''],
      icon: 'rise'
    },
    {
      title: 'Document',
      routerLink: ['news'],
      icon: 'rise',
      children: [
        {
          title: 'Getting Started'
        }
      ]
    }
  ];
}
