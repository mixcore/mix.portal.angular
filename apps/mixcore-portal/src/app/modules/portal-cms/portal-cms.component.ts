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
      icon: 'fa fa-file-code-o',
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-bar-chart',
      actions: [
        {
          title: 'View',
          icon: 'fa fa-pencil-square-o',
          action: () => this.navigateTo(''),
        },
      ],
    },
    {
      title: 'Navigation',
      icon: 'fas fa-share-alt',
      actions: [
        {
          title: 'View',
          icon: 'fa fa-pencil-square-o',
          action: () => this.navigateTo(''),
        },
      ],
    },
    {
      title: 'Page',
      icon: 'fa fa-file-powerpoint-o',
      actions: [
        {
          title: 'View list',
          icon: 'fa fa-pencil-square-o',
          action: () => this.navigateTo('page'),
        },
        {
          title: 'Create new',
          icon: 'fa fa-plus',
          action: () => this.navigateTo('page'),
        },
      ],
    },
    {
      title: 'Post',
      icon: 'fas fa-columns',
      actions: [
        {
          title: 'View list',
          icon: 'fa fa-pencil-square-o',
          action: () => this.navigateTo('post'),
        },
        {
          title: 'Create new',
          icon: 'fa fa-plus',
          action: () => this.navigateTo('post'),
        },
      ],
    },
    {
      title: 'Module',
      icon: 'fas fa-dice-d6',
      actions: [
        {
          title: 'View list',
          icon: 'fa fa-pencil-square-o',
          action: () => this.navigateTo('module'),
        },
        {
          title: 'Create new',
          icon: 'fa fa-plus',
          action: () => this.navigateTo('module'),
        },
      ],
    },
  ];

  constructor(public router: Router) {
    super(router);
  }
}
