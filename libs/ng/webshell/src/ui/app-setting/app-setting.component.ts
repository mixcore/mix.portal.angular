import { BaseComponent, ComponentType } from '@coreng/angular-core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-settings',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingComponent extends BaseComponent<ComponentType.Smart> {
  public availableLanguage: { id: string; label: string }[] = [];
  public activeLanguage: string | undefined;

  constructor(private translateService: TranslocoService) {
    super();
  }

  public onInit(): void {
    this.availableLanguage = this.translateService.getAvailableLangs() as { id: string; label: string }[];
    this.activeLanguage = this.translateService.getActiveLang();
  }

  public onLanguageChange(id: string): void {
    this.translateService.setActiveLang(id);
  }
}
