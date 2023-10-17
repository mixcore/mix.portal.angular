import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PortalHubModel, SignalEventType } from '@mixcore/lib/model';
import { AuthService } from '@mixcore/share/auth';
import { MixUtcDatePipe } from '@mixcore/share/pipe';
import { MixPortalHub } from '@mixcore/share/signalR';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixJsonEditorComponent } from '@mixcore/ui/json';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiLinkModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiBadgedContentModule, TuiPushModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-portal-hub',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    TuiPushModule,
    TuiBadgedContentModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiLinkModule,
    MixUtcDatePipe,
    TuiLinkModule,
    TuiDialogModule,
    MixJsonEditorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './portal-hub.component.html',
  styleUrls: ['./portal-hub.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortalHubComponent {
  public openPreview = false;
  public open = false;
  public newMessageCount = 0;
  public events = signal<PortalHubModel[]>([]);
  public selectedEvent: PortalHubModel | undefined = undefined;
  public eventForm = new FormControl();

  constructor(public portalHub: MixPortalHub, public auth: AuthService) {
    portalHub
      .getMessage<PortalHubModel>(SignalEventType.NewMessage)
      .subscribe((v) => {
        if (this.events().length === 0) this.open = true;
        if (!this.open) this.newMessageCount += 1;

        this.events.update((s) => [v.data, ...s]);
      });
  }

  public toggle(open: boolean): void {
    this.newMessageCount = 0;
    this.open = open;
  }

  public showPreview(item: PortalHubModel) {
    this.selectedEvent = item;
    this.openPreview = true;

    this.eventForm.patchValue(item);
  }
}
