import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownControllerModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';

import { RouteConfig } from '../../../routes/routes.const';
import { AppEvent, AppEventService } from '../../../services';

@Component({
  selector: 'mix-content-menu',
  templateUrl: './content-menu.component.html',
  styleUrls: ['./content-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    TuiDropdownControllerModule,
    RouterModule
  ]
})
export class ContentMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public readonly events = AppEvent;
  public open = false;

  constructor(private route: Router, public appEvent: AppEventService) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`portal/${route}`);
  }

  public createNew(type: 'CreatePage' | 'CreatePost' | 'CreateModule'): void {
    switch (type) {
      case 'CreatePage':
        this.appEvent.notify({ type: AppEvent.CreatePage });
        break;
      case 'CreatePost':
        this.appEvent.notify({ type: AppEvent.CreatePost });
        break;
      default:
        this.appEvent.notify({ type: AppEvent.CreateModule });
        break;
    }

    this.open = false;
  }
}
