import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderMenuComponent, MixToolbarMenu, ShareModule, SideMenuComponent } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-portal-layout',
  template: `<div class="cms-portal-container">
    <mix-side-menu [menuItems]="menuItems"></mix-side-menu>
    <div class="cms-portal-container__workspace">
      <mix-header-menu></mix-header-menu>
      <div class="cms-portal-container__main-workspace">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div> `,
  styles: [
    `
      .cms-portal-container {
        width: 100vw;
        height: 100vh;
        display: flex;

        &__workspace {
          width: 100%;
        }

        &__main-workspace {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
        }
      }
    `
  ],
  standalone: true,
  imports: [HeaderMenuComponent, RouterModule, ShareModule, ReactiveFormsModule, SideMenuComponent]
})
export class PortalLayoutComponent {
  public menuItems: MixToolbarMenu[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'smart-home',
      detail: [
        {
          title: 'Statistical',
          icon: 'list-numbers',
          action: () => console.log(123)
        },
        {
          title: 'News',
          icon: 'list-numbers',
          action: () => console.log(123)
        }
      ]
    },
    {
      id: 2,
      title: 'Tenant',
      icon: 'vector-triangle',
      detail: [
        {
          title: 'Create new',
          icon: 'plus',
          action: () => console.log(123)
        },
        {
          title: 'List tenant',
          icon: 'list-numbers',
          action: () => console.log(123)
        },
        {
          title: 'List domain',
          icon: 'list-numbers',
          action: () => console.log(123)
        }
      ]
    },
    {
      id: 3,
      title: 'Post',
      icon: 'ad-2',
      detail: [
        {
          title: 'Create new',
          icon: 'plus',
          action: () => console.log(123)
        },
        {
          title: 'List posts',
          icon: 'list-numbers',
          action: () => console.log(123)
        }
      ]
    }
  ];
}
