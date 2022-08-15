import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeModel } from '@mix-spa/mix.lib';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { switchMap } from 'rxjs';

import {
  AppEvent,
  AppEventService,
  PortalSidebarControlService
} from '../../services';
import { ThemeApiService } from '../../services/api/theme-api.service';
import { ShareModule } from '../../share.module';
import { FormUtils } from '../../utils';
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
    isCloneFromCurrentTheme: new FormControl(true)
  });

  constructor(
    private themeApi: ThemeApiService,
    public appEvent: AppEventService,
    private sidebarControl: PortalSidebarControlService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  public onImportTheme(): void {
    if (!FormUtils.validateForm(this.themeForm)) {
      return;
    }

    this.themeForm.disable();
    this.themeApi
      .getDefaultTheme()
      .pipe(
        switchMap(defaultTheme => {
          const form = this.themeForm.getRawValue();
          const request: ThemeModel = {
            ...defaultTheme,
            ...form
          };
          return this.themeApi.updateTheme(request);
        })
      )
      .subscribe(() => {
        this.appEvent.event$.next({ type: AppEvent.NewThemeAdded });
        this.sidebarControl.hide();
        this.alertService
          .open('Successfully create new theme!', {
            status: TuiNotification.Success
          })
          .subscribe();
      });
  }
}
