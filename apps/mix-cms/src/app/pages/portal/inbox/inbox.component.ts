import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { MessengerComponent } from '../../../components/messenger/messenger.component';

@Component({
  selector: 'mix-inbox',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixInputComponent,
    MessengerComponent,
    TuiAvatarModule,
    TuiLinkModule,
  ],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent {}
