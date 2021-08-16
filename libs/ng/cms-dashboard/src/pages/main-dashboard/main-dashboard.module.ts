/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard.component';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

const ANT_IMPORTS: any = [NzTableModule, NzGridModule, NzTabsModule, NzEmptyModule];

@NgModule({
  declarations: [MainDashboardComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainDashboardComponent }]),
    CommonModule,
    NgxChartsModule,
    TranslocoModule,
    ...ANT_IMPORTS
  ],
  exports: [MainDashboardComponent]
})
export class MainDashboardModule {}
