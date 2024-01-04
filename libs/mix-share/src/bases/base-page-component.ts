import {
  Directive,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ToolbarService } from '@mixcore/share/components';
import { BaseComponent } from './base-component';

@Directive()
export class BasePageComponent extends BaseComponent {
  @ViewChild('breadcrumb') public breadcrumb?: TemplateRef<HTMLElement>;
  public toolbarService = inject(ToolbarService);
  public viewRef = inject(ViewContainerRef);

  ngAfterViewInit() {
    if (this.breadcrumb) this.toolbarService.add(this.breadcrumb, this.viewRef);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.toolbarService.remove();
  }
}
