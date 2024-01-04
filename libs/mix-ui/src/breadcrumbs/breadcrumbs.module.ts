import { NgModule } from '@angular/core';
import { MixBreadcrumbItemDirective } from './breadcrumbs-item.directive';
import { MixBreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  imports: [MixBreadcrumbItemDirective, MixBreadcrumbsComponent],
  exports: [MixBreadcrumbItemDirective, MixBreadcrumbsComponent],
})
export class MixBreadcrumbsModule {}
