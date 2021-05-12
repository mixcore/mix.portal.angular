import { BaseComponent } from '../../shared/base/base.component';
import { Component } from '@angular/core';
import { MenuItem } from '../../shared/models/sidebar-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mix-portal-cms',
  templateUrl: './portal-cms.component.html',
  styleUrls: ['./portal-cms.component.scss'],
})
export class PortalCmsComponent extends BaseComponent {
  public portalCmsItems: MenuItem[] = [
    {
      title: 'Document',
      icon: 'mi mi-DuplexPortraitOneSided mi-lg me-4x',
    },
    {
      title: 'Dashboard',
      icon: 'mi mi-Tiles mi-lg me-4x',
      actions: [
        {
          title: 'View',
          icon: 'mi mi-Tiles mi-lg me-4x',
          action: () => this.navigateTo(''),
        },
      ],
    },
    {
      title: 'Page',
      icon: 'mi mi-Page mi-lg mi4x',
      actions: [
        {
          title: 'View list',
          icon: 'mi mi-Add mi-lg me-4x',
          action: () => this.navigateTo('page'),
        },
        {
          title: 'Create new',
          icon: 'mi mi-Add mi-lg me-4x',
          action: () => this.navigateTo('page'),
        },
      ],
    },
  ];

  constructor(public router: Router) {
    super(router);
  }
}
