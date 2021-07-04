import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-portal-dashboard-news',
  templateUrl: './dashboard-news.component.html',
  styleUrls: ['./dashboard-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardNewsComponent {}
