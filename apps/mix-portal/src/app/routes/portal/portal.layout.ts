import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderMenuComponent, ShareModule, SidebarMenuModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-portal-layout',
  template: `<div class="cms-portal-container">
    <mix-sidebar-menu></mix-sidebar-menu>
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
  imports: [HeaderMenuComponent, RouterModule, ShareModule, ReactiveFormsModule, SidebarMenuModule]
})
export class PortalLayoutComponent {
  //
}
