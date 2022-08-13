import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TUI_ARROW, TuiAccordionModule, TuiArrowModule } from '@taiga-ui/kit';

import { RouteConfig } from '../../../routes/routes.const';

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
    RouterModule
  ]
})
export class TemplateMenuComponent {
  public readonly arrow = TUI_ARROW;
  public readonly routes = RouteConfig;

  constructor(private route: Router) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`portal/${route}`);
  }
}
