import { EmbeddedViewRef, Injectable, TemplateRef } from '@angular/core';
import { AbstractTuiPortalService } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root'
})
export class PortalSidebarControlService extends AbstractTuiPortalService {
  public currentTemplates: EmbeddedViewRef<unknown>[] = [];

  public show(templateRef: TemplateRef<unknown>): void {
    this.removeAll();
    this.currentTemplates.push(this.addTemplate(templateRef));
  }

  public removeAll(): void {
    this.currentTemplates.forEach(c => this.removeTemplate(c));
    this.currentTemplates = [];
  }
}
