import { Component, Input } from '@angular/core';

import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-workspace-dynamic-layout',
  templateUrl: './workspace-dynamic.component.html',
  styleUrls: ['./workspace-dynamic.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class WorkspaceDynamicComponent {
  @Input() public showToolbar = true;
  @Input() public showHeader = true;
}
