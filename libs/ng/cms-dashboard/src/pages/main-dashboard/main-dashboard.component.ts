/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainDashboardComponent {
  // options
  public gradient: boolean = true;
  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public isDoughnut: boolean = true;
  public legendPosition: LegendPosition = LegendPosition.Below;

  public colorScheme: { domain: string[] } = {
    domain: ['#f06', '#52c41a', '#faad14', '#f5222d', '#AAAAAA']
  };

  public data: { name: string; value: number }[] = [
    {
      name: 'Posts',
      value: 5
    },
    {
      name: 'Pages',
      value: 4
    },
    {
      name: 'Modules',
      value: 2
    },
    {
      name: 'Users',
      value: 2
    },
    {
      name: 'Navigation',
      value: 3
    }
  ];

  public chartLabelFormat = (label: string) => {
    const index: number = this.data.findIndex((x: { name: string; value: number }) => x.name === label);

    return `${label} (${this.data[index].value})`;
  };
}
