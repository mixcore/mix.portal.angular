import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { SiteInitFormComponent } from '../../components/site-init-form/site-init-form.component';

@Component({
  selector: 'site-init',
  templateUrl: './site-init.component.html',
  styleUrls: ['./site-init.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteInitComponent {
  @ViewChild('siteForm', { static: false }) public siteFormComp?: SiteInitFormComponent;

  public submitSite(): void {
    if (this.siteFormComp) {
      this.siteFormComp.submitSiteForm();
    }
  }
}
