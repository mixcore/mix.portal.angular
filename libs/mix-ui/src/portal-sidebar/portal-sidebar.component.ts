import { Portal, PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { slideInRightOnEnterAnimation } from '@mixcore/share/animation';
import { PortalSidebarService } from './portal-sidebar.service';

@Component({
  selector: 'mix-portal-sidebar',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './portal-sidebar.component.html',
  styleUrls: ['./portal-sidebar.component.scss'],
  animations: [slideInRightOnEnterAnimation({ duration: 200 })],
})
export class PortalSidebarComponent {
  selectedPortal?: Portal<any>;

  constructor(public portalSideBar: PortalSidebarService) {
    this.portalSideBar.selectedPortal$.subscribe(
      (v) => (this.selectedPortal = v)
    );
  }
}
