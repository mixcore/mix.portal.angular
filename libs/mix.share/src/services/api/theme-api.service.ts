import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IPaginationResult, ThemeModel } from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../bases/base-api.service';
import { BASE_URL, GET_THEME_URL } from '../../token';
import { AppEventService } from '../helper/app-event.service';

@Injectable({ providedIn: 'root' })
export class ThemeApiService extends BaseApiService {
  constructor(
    protected override readonly http: HttpClient,
    @Inject(BASE_URL) public override baseUrl: string,
    @Inject(GET_THEME_URL) public getThemeUrl: string,
    public override appEvent: AppEventService
  ) {
    super(http, baseUrl, appEvent);
  }

  public getTheme(): Observable<IPaginationResult<ThemeModel>> {
    return this.http.get<IPaginationResult<ThemeModel>>(this.getThemeUrl);
  }
}
