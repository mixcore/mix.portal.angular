import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

import {
  AppEvent,
  AppEventService
} from '../../services/helper/app-event.service';
import { LocationService } from '../../services/helper/tab-control.service';

@Component({
  selector: 'mix-location-controller',
  templateUrl: './location-controller.component.html',
  styleUrls: ['./location-controller.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiButtonModule]
})
export class LocationControllerComponent {
  constructor(
    public location: Location,
    private appEvent: AppEventService,
    public locationService: LocationService
  ) {}

  public refreshClick(): void {
    this.appEvent.notify({
      type: AppEvent.Refresh
    });
  }

  public goBack() {
    //
  }
}
