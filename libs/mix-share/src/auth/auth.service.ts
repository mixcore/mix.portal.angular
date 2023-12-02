import { Injectable, InjectionToken, inject } from '@angular/core';
import {
  GlobalSettings,
  LoginModel,
  SignUpModel,
  TokenInfo,
  User,
} from '@mixcore/lib/auth';
import { MixSwagger } from '@mixcore/lib/swagger';

import { HttpErrorResponse } from '@angular/common/http';
import {
  Culture,
  MenuItem,
  MixRole,
  MixRoleConst,
  PaginationRequestModel,
  PaginationResultModel,
  PortalMenu,
} from '@mixcore/lib/model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import { MixDatabaseApi } from '../api-service/database-api.service';
import { MixAccountApi } from '../api-service/mix-account-api';
import { BaseApiService } from '../bases/base-api.service';
import { DomHelper } from '../helpers';
import { cryptoService } from './crypto-service';

export const FULL_MENU = new InjectionToken<MenuItem[]>(
  'Available routes for your application'
);

export const PRODUCT_MENU = new InjectionToken<MenuItem[]>(
  'Available routes for no super admin'
);

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseApiService {
  public static EXT_ACCESS_TOKEN = 'external_access_token';
  public static ACCESS_TOKEN = 'access_token';
  public static REFRESH_TOKEN = 'refresh_token';
  public static TOKEN_TYPE = 'token_type';
  public static CULTURE = 'culture';
  public static SPECIFIC_CULTURE = 'specificCulture';

  public FULL_ROUTES = inject(FULL_MENU);
  public SCOPED_ROUTES = inject(PRODUCT_MENU);
  public accountApi = new MixAccountApi();
  public databaseApi = new MixDatabaseApi(MixSwagger.content.database);
  public user$ = new BehaviorSubject<User | null>(null);
  public cultures$ = new BehaviorSubject<Culture[]>([]);
  public currentCulture: Culture | undefined = undefined;
  public isAuthorized$ = new BehaviorSubject<boolean | undefined>(undefined);
  public globalSetting$ = new BehaviorSubject<GlobalSettings | undefined>(
    undefined
  );
  public logout$ = new Subject<void>();
  public portalMenu: MenuItem[] = [];
  public currentRoles: MixRole[] = [];

  public get refreshToken(): string | null {
    return localStorage.getItem(AuthService.REFRESH_TOKEN);
  }

  public get accessToken(): string | null {
    return localStorage.getItem(AuthService.ACCESS_TOKEN);
  }

  public get tokenType(): string | null {
    return localStorage.getItem(AuthService.TOKEN_TYPE);
  }

  public handleTokenInfo(tokenInfo: TokenInfo) {
    if (tokenInfo?.info) {
      localStorage.setItem(AuthService.ACCESS_TOKEN, tokenInfo.accessToken);
      localStorage.setItem(AuthService.REFRESH_TOKEN, tokenInfo.refreshToken);
      localStorage.setItem(AuthService.TOKEN_TYPE, tokenInfo.tokenType);
    }

    this.isAuthorized$.next(true);
  }

  public login(
    loginData: LoginModel,
    apiEncryptKey: string
  ): Observable<TokenInfo> {
    const encrypted = cryptoService.encryptAES(
      JSON.stringify(loginData),
      apiEncryptKey
    );

    return this.post<{ message: string }, TokenInfo>(MixSwagger.auth.signIn, {
      message: encrypted,
    }).pipe(
      switchMap((tokenInfo) => {
        this.handleTokenInfo(tokenInfo);
        return of(tokenInfo);
      })
    );
  }

  public renewToken() {
    return this.post<any, TokenInfo>(MixSwagger.auth.renewToken, {
      refreshToken: localStorage.getItem(AuthService.REFRESH_TOKEN),
      accessToken: this.accessToken,
    }).pipe(
      switchMap((tokenInfo) => {
        this.handleTokenInfo(tokenInfo);
        return of(tokenInfo);
      })
    );
  }

  public logout(callback?: () => void): void {
    localStorage.removeItem(AuthService.EXT_ACCESS_TOKEN);
    localStorage.removeItem(AuthService.ACCESS_TOKEN);
    localStorage.removeItem(AuthService.REFRESH_TOKEN);
    localStorage.removeItem(AuthService.TOKEN_TYPE);

    this.logout$.next();
    this.isAuthorized$.next(false);
    this.user$.next(null);
    this.currentRoles = [];
    this.portalMenu = [];

    if (callback) callback();
  }

  public register(userData: SignUpModel): Observable<void> {
    return this.post<SignUpModel, void>(MixSwagger.auth.register, userData);
  }

  public fetchUserData(): Observable<User> {
    return this.get<User>(MixSwagger.auth.getProfile).pipe(
      switchMap((result) => {
        this.user$.next(result);
        return of(result);
      })
    );
  }

  public getGlobalSetting(): Observable<GlobalSettings> {
    return this.get<GlobalSettings>(MixSwagger.global.globalSetting);
  }

  public gelCultures(): Observable<PaginationResultModel<Culture>> {
    return this.get<PaginationResultModel<Culture>>(MixSwagger.auth.culture, {
      pageSize: 100,
    });
  }

  public setCulture(value: Culture) {
    localStorage.setItem(AuthService.CULTURE, JSON.stringify(value));
    localStorage.setItem(AuthService.SPECIFIC_CULTURE, value.specificulture);
  }

  public initRoles() {
    const currentRoles = this.user$.getValue()?.roles;
    let request: Observable<MixRole>[] = [];

    if (currentRoles?.length) {
      request = currentRoles.map((role) =>
        this.accountApi.getRoleById(role.roleId)
      );
    }

    if (!request.length) return of([]);

    return forkJoin(request).pipe(
      switchMap((roles) => {
        this.currentRoles = roles ?? [];

        return of(roles);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return of([]);
        } else {
          throw error;
        }
      })
    );
  }

  public initCultures() {
    return this.gelCultures().pipe(
      switchMap((result) => {
        this.cultures$.next(result.items ?? []);
        const culture = localStorage.getItem(AuthService.CULTURE);
        if (culture) {
          this.currentCulture = JSON.parse(culture);
        } else {
          this.currentCulture = result.items[0];
        }

        if (this.currentCulture) this.setCulture(this.currentCulture);

        return of(result);
      }),
      catchError((error) => {
        if (error.status === 403) {
          return of([]);
        } else {
          throw error;
        }
      })
    );
  }

  public isSupperAdmin() {
    return (
      !this.currentRoles.length ||
      this.currentRoles.some((x) => x.name === MixRoleConst.SuperAdmin)
    );
  }

  public initPortalsMenu() {
    if (this.isSupperAdmin()) {
      this.portalMenu = this.FULL_ROUTES;
      return of(this.FULL_ROUTES);
    }

    return this.getPortalMenuByRole('Owner').pipe(
      switchMap((portalMenus: PortalMenu[]) => {
        const menuItems = portalMenus.map(
          (x) =>
            <MenuItem>{
              ...x,
              url: x.path,
              children: x.childMenu?.map((c) => ({ ...c, url: c.path })),
            }
        );

        this.portalMenu = menuItems;

        return of(this.portalMenu);
      })
    );
  }

  public initGlobalSettings() {
    this.getGlobalSetting().subscribe((v) => this.globalSetting$.next(v));
  }

  public changeCulture(culture: Culture) {
    this.currentCulture = culture;
    localStorage.setItem(AuthService.CULTURE, JSON.stringify(culture));
    window.location.reload();
  }

  public clearRedirectUrl(): void {
    localStorage.setItem('redirectUrl', '');
  }

  public get redirectUrl(): string | null {
    return localStorage.getItem('redirectUrl');
  }

  public getPortalMenuByRole(roleName: string) {
    const query = <PaginationRequestModel>{
      pageIndex: 0,
      pageSize: 30,
      searchMethod: 'InRange',
      searchColumns: 'Role',
    };
    const portalMenuDebName = 'PortalMenu';
    return this.databaseApi
      .getDataByName<PortalMenu>(portalMenuDebName, {
        ...query,
        keyword: roleName,
        queries: [
          {
            fieldName: 'PortalMenuId',
            value: null,
            compareOperator: 'Equal',
            isRequired: false,
          },
        ],
      })
      .pipe(
        switchMap((result) => {
          if (!result.items.length) {
            return of(result.items);
          }

          const request = result.items.map((data, index) => {
            return this.databaseApi
              .getDataByName<PortalMenu>(portalMenuDebName, {
                ...query,
                keyword: roleName,
                parentId: data.id,
                parentName: portalMenuDebName,
              })
              .pipe(
                map((v) => {
                  result.items[index].childMenu = [...v.items];

                  return v;
                })
              );
          });

          return forkJoin(request).pipe(map(() => result.items));
        })
      );
  }

  public checkAuthorize(): boolean {
    const token = localStorage.getItem(AuthService.ACCESS_TOKEN);
    if (!token) {
      this.isAuthorized$.next(false);
      return false;
    }

    const tokenInfo = DomHelper.decodeJWT(token);
    if (tokenInfo && tokenInfo['ExpireAt']) {
      if (new Date(tokenInfo['ExpireAt']) > new Date()) {
        this.isAuthorized$.next(true);
        return true;
      }
    }

    this.isAuthorized$.next(false);
    return false;
  }
}
