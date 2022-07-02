import { EmbeddedViewRef, Injectable, TemplateRef } from '@angular/core';
import { AbstractTuiPortalService } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root'
})
export class PortalSidebarControlService extends AbstractTuiPortalService {
  public currentTemplate: EmbeddedViewRef<unknown> | null = null;

  public show(templateRef: TemplateRef<unknown>): void {
    if (this.currentTemplate) {
      this.removeTemplate(this.currentTemplate);
    }

    this.currentTemplate = this.addTemplate(templateRef);
  }

  public hide(): void {
    if (this.currentTemplate) this.removeTemplate(this.currentTemplate);

    this.currentTemplate = null;
  }
}
