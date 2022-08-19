import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import {
  AbstractTuiPortalHostComponent,
  AbstractTuiPortalService
} from '@taiga-ui/cdk';

import { PortalSidebarControlService } from '../../services';

@Component({
  selector: 'mix-portal-sidebar-host',
  templateUrl: './portal-sidebar-host.component.html',
  styleUrls: ['./portal-sidebar-host.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: AbstractTuiPortalService,
      useExisting: PortalSidebarControlService
    }
  ]
})
export class PortalSidebarHostComponent extends AbstractTuiPortalHostComponent {
  constructor(
    elementRef: ElementRef<HTMLElement>,
    portalService: AbstractTuiPortalService,
    public sidebarControl: PortalSidebarControlService
  ) {
    super(elementRef, portalService);
  }
}
