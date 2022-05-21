import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardApiService, HeaderMenuService, ShareModule } from '@mix-spa/mix.share';
import { TuiBadgeModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, ShareModule, TuiBadgeModule]
})
export class DashBoardComponent {
  public weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public currentDay = this.weekday[new Date().getDay()];
  public currentDate = new Date().toLocaleDateString();
  public portalInfo$ = this.dashboardApi.getDashboardInfo();

  constructor(public dashboardApi: DashboardApiService, public headerService: HeaderMenuService) {
    this.headerService.setTitle('Dashboard');
  }
}
