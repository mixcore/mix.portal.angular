import { Component } from '@angular/core';

import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-chat-box',
  templateUrl: './mix-chat-box.component.html',
  styleUrls: ['./mix-chat-box.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class MixChatBoxComponent {}
