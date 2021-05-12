import { BreadcrumbModule } from 'carbon-components-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PORTAL_CMS_ROUTES } from './portal-cms.routing';
import { PortalCmsComponent } from './portal-cms.component';
import { PortalDashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PortalCmsComponent, PortalDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PORTAL_CMS_ROUTES),
    BreadcrumbModule,
    SharedModule,
  ],
  exports: [RouterModule],
  bootstrap: [PortalCmsComponent],
})
export class PortalCMSModule {}
