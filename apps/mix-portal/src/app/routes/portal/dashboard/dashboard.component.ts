import { Component } from '@angular/core';

@Component({
  selector: 'mix-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashBoardComponent {
  public messages = [
    [18, 'Good night'],
    [13, 'Good afternoon'],
    [6, 'Good morning']
  ];
  public weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public currentDay = this.weekday[new Date().getDay()];
  public currentDate = new Date().toLocaleDateString();
}
