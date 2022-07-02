import { Component, Input, OnInit } from '@angular/core';

import { slideAnimation } from '../../animations/slide';
import { PortalSidebarControlService } from '../../services';
import { MixModuleApiService } from '../../services/api/mix-module-api.service';
import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-module-detail',
  templateUrl: './mix-module-detail.component.html',
  styleUrls: ['./mix-module-detail.component.scss'],
  standalone: true,
  imports: [ShareModule],
  animations: [slideAnimation]
})
export class MixModuleDetailComponent implements OnInit {
  @Input() public mode: 'Quickly' | 'FullPage' = 'FullPage';
  @Input() public moduleId = 0;

  constructor(
    private sidebarControl: PortalSidebarControlService,
    private moduleApi: MixModuleApiService
  ) {}

  public closeSidebar(): void {
    this.sidebarControl.hide();
  }

  public ngOnInit(): void {
    this.moduleApi.getModuleById(this.moduleId).subscribe(module => {
      console.log(module);
    });
  }
}
