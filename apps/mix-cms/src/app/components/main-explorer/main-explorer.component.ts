import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { PortalHubComponent } from '../portal-hub/portal-hub.component';

@Component({
  selector: 'mix-main-explorer',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatarModule,
    PortalHubComponent,
    MixButtonComponent,
  ],
  templateUrl: './main-explorer.component.html',
  styleUrls: ['./main-explorer.component.scss'],
})
export class MainExplorerComponent {}
