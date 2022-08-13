import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TuiAccordionModule } from '@taiga-ui/kit';

import { RouteConfig } from '../../../routes/routes.const';

@Component({
  selector: 'mix-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiAccordionModule, RouterModule]
})
export class DashboardMenuComponent {
  public readonly routes = RouteConfig;

  constructor(private route: Router) {}

  public navigateTo(route: string): void {
    this.route.navigateByUrl(`portal/${route}`);
  }
}
