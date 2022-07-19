import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

import { slideAnimation } from '../../animations/slide';
import { PortalSidebarControlService } from '../../services';
import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  standalone: true,
  imports: [ShareModule, TablerIconsModule],
  animations: [slideAnimation]
})
export class SidebarContainerComponent {
  constructor(private sidebarControl: PortalSidebarControlService) {}

  public closeSideBar(): void {
    this.sidebarControl.hide();
  }
}
