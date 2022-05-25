import { Component, OnDestroy } from '@angular/core';
import { DashboardApiService, HeaderMenuService, MixWidgetComponent, ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ShareModule, MixWidgetComponent]
})
export class DashBoardComponent implements OnDestroy {
  public weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public currentDay = this.weekday[new Date().getDay()];
  public currentDate = new Date().toLocaleDateString();
  public portalInfo$ = this.dashboardApi.getDashboardInfo();

  constructor(public dashboardApi: DashboardApiService, public headerService: HeaderMenuService) {
    this.headerService.setTitle('Dashboard');
  }

  public ngOnDestroy() {
    this.headerService.setTitle('');
  }
}
