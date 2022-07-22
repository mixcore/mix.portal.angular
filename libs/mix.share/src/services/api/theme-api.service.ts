import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  IPaginationResult,
  MixApiDict,
  PaginationRequestModel,
  PaginationResultModel,
  ThemeModel
} from '@mix-spa/mix.lib';
import { Observable } from 'rxjs';

import { BaseApiService, IHttpParamObject } from '../../bases/base-api.service';
import { BASE_URL, GET_THEME_URL } from '../../token';
import { AppEventService } from '../helper/app-event.service';

@Injectable({ providedIn: 'root' })
export class ThemeApiService extends BaseApiService {
  constructor(
    protected override readonly http: HttpClient,
    @Inject(BASE_URL) public override baseUrl: string,
    @Inject(GET_THEME_URL) public getThemeStoreUrl: string,
    public override appEvent: AppEventService
  ) {
    super(http, baseUrl, appEvent);
  }

  public getThemeStore(): Observable<IPaginationResult<ThemeModel>> {
    return this.http.get<IPaginationResult<ThemeModel>>(this.getThemeStoreUrl);
  }

  public getDefaultTheme(): Observable<ThemeModel> {
    return this.get(MixApiDict.ThemeApi.getDefaultThemeEndpoint);
  }

  public getThemes(
    request: PaginationRequestModel
  ): Observable<PaginationResultModel<ThemeModel>> {
    return this.get<PaginationResultModel<ThemeModel>>(
      MixApiDict.ThemeApi.prefix,
      <IHttpParamObject>request
    );
  }

  public updateTheme(theme: ThemeModel): Observable<number> {
    return this.post<ThemeModel, number>(MixApiDict.ThemeApi.prefix, theme);
  }
}
