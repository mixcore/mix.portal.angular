import { Injectable } from '@angular/core';
import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable } from 'rxjs';
import { BaseApiService } from '../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class DashboardApiService extends BaseApiService {
  public getDashboardInfo(): Observable<{
    totalPage: number;
    totalPost: number;
    totalProduct: number;
    totalModule: number;
    totalUser: number;
  }> {
    return this.get<{
      totalPage: number;
      totalPost: number;
      totalProduct: number;
      totalModule: number;
      totalUser: number;
    }>(MixSwagger.global.dashboardInfo);
  }
}
