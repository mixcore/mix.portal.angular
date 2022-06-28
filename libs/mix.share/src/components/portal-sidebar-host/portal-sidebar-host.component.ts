import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AbstractTuiPortalService,
      useExisting: PortalSidebarControlService
    }
  ]
})
export class PortalSidebarHostComponent extends AbstractTuiPortalHostComponent {}
