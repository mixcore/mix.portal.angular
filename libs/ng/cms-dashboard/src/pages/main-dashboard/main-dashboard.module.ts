import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard.component';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [MainDashboardComponent],
  imports: [CommonModule, NgxChartsModule, TranslocoModule, NzGridModule, NzTabsModule, NzEmptyModule],
  exports: [MainDashboardComponent]
})
export class MainDashboardModule {}
