import { BaseComponent, ComponentType } from '@coreng/angular-core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppSettingComponent } from '../app-setting/app-setting.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends BaseComponent<ComponentType.Smart> {
  constructor(private modalService: NzModalService, private translateSrv: TranslocoService) {
    super();
  }
  public openAppSetting(): void {
    this.modalService.create({
      nzContent: AppSettingComponent,
      nzBodyStyle: { height: '300px' },
      nzCentered: true
    });
  }
}
