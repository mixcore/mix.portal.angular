import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import { TuiTreeModule } from '@taiga-ui/kit';

import { MenuItemComponent } from './menu-item/menu-item';
import { SidebarMenuComponent } from './sidebar-menu.component';

@NgModule({
  declarations: [SidebarMenuComponent, MenuItemComponent],
  imports: [CommonModule, TuiTreeModule, TuiSvgModule],
  exports: [SidebarMenuComponent]
})
export class SidebarMenuModule {}
