import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ShareModule } from '../../share.module';
import { MixFileInputComponent } from '../mix-file-input/mix-file-input.component';

@Component({
  selector: 'mix-theme-import',
  templateUrl: './mix-theme-import.component.html',
  styleUrls: ['./mix-theme-import.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, MixFileInputComponent]
})
export class MixThemeImportComponent {
  @Input() public mode: 'Quick' | 'Fullscreen' = 'Fullscreen';

  public themeForm: FormGroup = new FormGroup({
    displayName: new FormControl('', Validators.required),
    previewUrl: new FormControl(''),
    isCloneFromCurrentTheme: new FormControl(false)
  });
}
