import { Component } from '@angular/core';

import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-user-list-hub',
  templateUrl: './user-list-hub.component.html',
  styleUrls: ['./user-list-hub.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class MixUserListHubComponent {
  //
}
