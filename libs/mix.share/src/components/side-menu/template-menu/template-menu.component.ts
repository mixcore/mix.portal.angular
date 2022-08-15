import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';
import { filter, takeUntil } from 'rxjs';

import { RouteConfig } from '../../../routes/routes.const';
import {
  AppEvent,
  AppEventService
} from '../../../services/helper/app-event.service';
import { DestroyService } from '../../../services/helper/destroy.service';
import { ThemeFileTreeComponent } from '../../theme-file-tree/theme-file-tree.component';

@Component({
  selector: 'mix-template-menu',
  templateUrl: './template-menu.component.html',
  styleUrls: ['./template-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiAccordionModule,
    TuiButtonModule,
    TuiArrowModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    RouterModule,
    ThemeFileTreeComponent
  ],
  providers: [DestroyService]
})
export class TemplateMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;
  public selectedThemeId: number | undefined = undefined;

  constructor(
    private route: Router,
    public appEvent: AppEventService,
    public destroy$: DestroyService
  ) {
    this.appEvent.event$
      .pipe(
        filter(e => e.type === AppEvent.ThemeSelected),
        takeUntil(this.destroy$)
      )
      .subscribe(e => {
        this.selectedThemeId = e.data.id;
      });
  }

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`portal/${route}`);
  }
}
