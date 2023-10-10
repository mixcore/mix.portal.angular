import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MixInputComponent } from '@mixcore/ui/input';
import { CmdkModule } from '@ngneat/cmdk';

@Component({
  selector: 'mix-setting-dialog',
  standalone: true,
  imports: [CommonModule, MixInputComponent, CmdkModule],
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SettingDialogComponent {
  public selectedSetting: 'token' | 'application' | 'account' = 'token';
}
